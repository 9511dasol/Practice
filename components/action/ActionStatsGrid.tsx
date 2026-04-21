import ActionStatCard from "./ActionStatCard";

const ActionStatsGrid = ({ danger, warning, info, success, average }: { danger: number; warning: number; info: number; success: number; average: number }) => (
    <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <ActionStatCard type="danger" title="긴급 (D-15 이내)" value={danger + ""} subtitle="즉시 처리 필요" />
        <ActionStatCard type="warning" title="주의 (D-30 이내)" value={warning + ""} subtitle="기한 임박" />
        <ActionStatCard type="info" title="진행중" value={info + ""} subtitle="담당자 배정 완료" />
        <ActionStatCard type="success" title="완료 (이번 분기)" value={success + ""} subtitle="검증 포함" />
        <ActionStatCard type="default" title="평균 완료 소요일" value={average + ""} subtitle="일 (Days)" />
    </div>
);
export default ActionStatsGrid;