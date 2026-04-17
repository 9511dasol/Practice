import ComingSoon from '@/components/ComingSoon';
import DetailedData from '@/components/dashBoard/ProjectDetailView';
import SkeletonTimeline from '@/components/dashBoard/skeletonTimeline';
import { getDetailedInfo } from '@/ingredients/getInfo';
import { DetailedProject, fetchData, Project } from '@/ingredients/interface'

interface Idoc {
    params: Promise<{ num: string }>; // 1. Promise 타입으로 정의
}

async function DocumentPage({ params }: Idoc) {
    const { num } = await params;
    const items: DetailedProject = await getDetailedInfo(+num);
    return (
        // <ComingSoon title="상세페이지" />
        <DetailedData data={items as DetailedProject} />
    );
}

function TempPage() {
    return <ComingSoon title="상세페이지" />
}

export default DocumentPage;
// 잘 기억하자a