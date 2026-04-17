export const ESGHeader = () => {
    return (
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">

            {/* 왼쪽: 타이틀 & ESG 아이콘 섹션 */}
            <div className="flex items-center gap-4">
                {/* ESG 포인트 컬러 (Emerald)를 인라인 스타일과 Tailwind로 조합 */}
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500 shadow-inner">
                    <i className="bx bx-leaf text-2xl"></i>
                </div>

                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <h1 className="text-[15px] font-bold tracking-tight text-slate-800">
                            ESG 데이터 관리
                        </h1>
                        {/* 활성화 상태를 나타내는 애니메이션 점 */}
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" title="실시간 모니터링 중"></span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-500 font-medium">
                        공장별 환경(E)·사회(S)·거버넌스(G) 데이터 업로드 및 실시간 기준 비교
                    </p>
                </div>
            </div>

            {/* 오른쪽: 액션 & 메타 정보 섹션 */}
            <div className="flex items-center gap-3">
                {/* 업로드 뱃지 - Warning Amber 컬러 적용 */}
                <div className="group flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 transition-all hover:shadow-md cursor-pointer">
                    <i className="bx bx-cloud-upload text-sm text-amber-500 group-hover:scale-110 transition-transform"></i>
                    <span className="text-[10px] font-bold text-amber-600">
                        표준 양식 업로드 가능
                    </span>
                </div>

                {/* 수직 구분선 */}
                <div className="mx-1 h-8 w-[1px] bg-slate-100" />

                {/* 기준일 정보 - 세련된 폰트 위계 적용 */}
                <div className="flex flex-col items-end px-2">
                    <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Standard Date</span>
                    <div className="flex items-center gap-1.5">
                        <i className="bx bx-calendar-check text-xs text-emerald-500"></i>
                        <span className="text-[12px] font-semibold text-slate-700 tabular-nums">
                            2025-03-23
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default ESGHeader;