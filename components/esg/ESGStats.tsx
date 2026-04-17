const ESGStats = () => {
    return (
        /* grid-cols-1: 모바일 (기본 1열)
           sm:grid-cols-2: 작은 태블릿 (2열)
           lg:grid-cols-5: 데스크톱 (5열) 
        */
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">

            {/* 1. 전체 입력 완료율 */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-slate-300 hover:shadow-md">
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">전체 입력 완료율</span>
                    <i className="bx bx-bar-chart-alt-2 text-slate-300 group-hover:text-slate-500 transition-colors"></i>
                </div>
                <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold tracking-tight text-slate-800">64</span>
                    <span className="text-sm font-semibold text-slate-400">%</span>
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-[10px] text-slate-400">
                    <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full bg-slate-400" style={{ width: '64%' }}></div>
                    </div>
                    <span className="whitespace-nowrap">평균</span>
                </div>
            </div>

            {/* 2. 에너지 사용 증감 (Warning) */}
            <div className="group rounded-2xl border border-amber-100 bg-white p-4 transition-all hover:border-amber-200 hover:shadow-md">
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">에너지 사용 증감</span>
                    <div className="rounded-full bg-amber-50 p-1 text-amber-500">
                        <i className="bx bx-bolt-circle text-base"></i>
                    </div>
                </div>
                <div className="text-2xl font-bold tracking-tight text-amber-600">+6.2%</div>
                <div className="mt-1 flex items-center gap-1 text-[10px] text-amber-500 font-medium font-semibold">
                    <i className="bx bx-trending-up"></i>
                    전년 동기 대비
                </div>
            </div>

            {/* 3. 용수 사용 증감 (Success) */}
            <div className="group rounded-2xl border border-emerald-100 bg-white p-4 transition-all hover:border-emerald-200 hover:shadow-md">
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">용수 사용 증감</span>
                    <div className="rounded-full bg-emerald-50 p-1 text-emerald-500">
                        <i className="bx bx-water text-base"></i>
                    </div>
                </div>
                <div className="text-2xl font-bold tracking-tight text-emerald-600">-3.1%</div>
                <div className="mt-1 flex items-center gap-1 text-[10px] text-emerald-600 font-medium font-semibold">
                    <i className="bx bx-check-circle"></i>
                    절감 달성
                </div>
            </div>

            {/* 4. 미입력 공장 (Danger) */}
            <div className="group rounded-2xl border border-rose-100 bg-white p-4 transition-all hover:border-rose-200 hover:shadow-md text-rose-500">
                <div className="mb-2 flex items-center justify-between text-slate-500">
                    <span className="text-[11px] font-bold uppercase tracking-tight">미입력 공장</span>
                    <i className="bx bx-error-circle text-rose-400 group-hover:animate-pulse text-lg"></i>
                </div>
                <div className="text-2xl font-bold tracking-tight text-rose-600">2</div>
                <div className="mt-1 flex items-center gap-1 text-[10px] font-semibold">
                    <span className="rounded bg-rose-50 px-1 py-0.5 uppercase">Urgent</span>
                    <span className="text-rose-400">베트남 · 인도</span>
                </div>
            </div>

            {/* 5. 기준 초과 항목 (Info) */}
            <div className="group rounded-2xl border border-blue-100 bg-white p-4 transition-all hover:border-blue-200 hover:shadow-md">
                <div className="mb-2 flex items-center justify-between text-slate-500">
                    <span className="text-[11px] font-bold uppercase tracking-tight">기준 초과 항목</span>
                    <i className="bx bx-info-circle text-blue-400 text-lg"></i>
                </div>
                <div className="text-2xl font-bold tracking-tight text-blue-600">3</div>
                <div className="mt-1 text-[10px] text-slate-400 font-medium">
                    바이어 기준 대비 초과
                </div>
            </div>
        </div>
    );
};

export default ESGStats;