const ActionHeader = ({ emergencyCount, inProgressCount }: { emergencyCount: number; inProgressCount: number }) => (
    <div className="sticky top-0 z-40 flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 bg-white/90 backdrop-blur-sm px-6 py-4 gap-3">
        <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-white shadow-sm">
                <i className="bx bx-task text-xl"></i>
            </div>
            <div>
                <h1 className="text-[15px] font-bold text-slate-800">Action 관리</h1>
                <p className="mt-0.5 text-[11px] font-medium text-slate-500">Gap 식별 후 후속조치 등록 · 담당자 배정 · 진행 추적</p>
            </div>
        </div>
        <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold text-amber-700 ring-1 ring-inset ring-amber-200/50">
                <i className="bx bxs-zap text-amber-500"></i>
                긴급 {emergencyCount}건 · 진행중 {inProgressCount}건
            </span>
            <span className="text-[11px] font-medium text-slate-400">기준일: 2025-03-23</span>
        </div>
    </div>
);

export default ActionHeader;