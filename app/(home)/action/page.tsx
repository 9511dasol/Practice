import ActionHeader from "@/components/action/ActionHeader";
import ActionStatsGrid from "@/components/action/ActionStatsGrid";
import ActionTable from "@/components/action/ActionTable";
import { ACTION_DATA } from "@/ingredients/mockData";

export default function ActionManagementPage() {
    const emergencyCount = ACTION_DATA.filter(item => item.status === '긴급').length;
    const warningCount = ACTION_DATA.filter(item => item.status === '주의').length;
    const completedCount = ACTION_DATA.filter(item => item.status === '완료').length;
    const inProgressCount = ACTION_DATA.filter(item => item.status === '진행중').length;

    return (
        <div className="flex h-full flex-col bg-slate-50/50">
            <ActionHeader emergencyCount={emergencyCount} inProgressCount={inProgressCount} />

            <div className="flex-1 p-4 sm:p-6 mx-auto w-full max-w-7xl">
                <ActionStatsGrid danger={emergencyCount} warning={warningCount} info={inProgressCount} success={completedCount} average={12.4} />
                <ActionTable data={ACTION_DATA} />

                <div className="mt-6 rounded-lg border border-slate-200 bg-slate-100/50 px-4 py-3 text-center text-[11px] font-medium text-slate-500 flex items-center justify-center gap-2">
                    <i className="bx bx-info-circle text-slate-400 text-sm"></i>
                    Action 관리 페이지 · Gap 식별 시 자동 Action 생성 → 담당자 배정 → 기한·상태 추적 → 완료 검증
                </div>
            </div>
        </div>
    );
}