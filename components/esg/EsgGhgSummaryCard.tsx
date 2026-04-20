"use client";

const EsgGhgSummaryCard = () => {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* 카드 헤더 */}
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 bg-slate-50/50">
                <div className="flex items-center gap-2">
                    <i className="bx bx-bar-chart-alt-2 text-emerald-600 text-lg"></i>
                    <span className="text-[13px] font-black text-slate-800">GHG 합계 요약</span>
                </div>
                <span className="rounded bg-slate-900 px-1.5 py-0.5 text-[8px] font-black text-white uppercase tracking-tighter">
                    WITHOUT BIO
                </span>
            </div>

            {/* 카드 본문 */}
            <div className="p-4">
                {/* 3개년 수치 그리드 */}
                <div className="grid grid-cols-3 gap-2 mb-5">
                    <StatBox value="3,902" label="2024 (tCO₂)" color="blue" />
                    <StatBox value="3,688" label="2023 (tCO₂)" color="emerald" />
                    <StatBox value="3,411" label="2022 (tCO₂)" color="slate" />
                </div>

                {/* 증감 분석 데이터 */}
                <div className="space-y-2.5 rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                    <TrendRow
                        label="24↔23 증감"
                        value="+214 tCO₂"
                        percent="+5.8%"
                        type="danger"
                    />
                    <div className="h-px bg-slate-200/50 mx-1" />
                    <TrendRow
                        label="23↔22 증감"
                        value="+277 tCO₂"
                        percent="+8.1%"
                        type="warning"
                    />
                </div>
            </div>
        </div>
    );
};

const StatBox = ({ value, label, color }: any) => {
    const colors: any = {
        blue: "bg-blue-50 text-blue-700 ring-blue-100",
        emerald: "bg-emerald-50 text-emerald-700 ring-emerald-100",
        slate: "bg-slate-100 text-slate-600 ring-slate-200",
    };
    return (
        <div className={`rounded-xl p-3 text-center ring-1 ring-inset ${colors[color]}`}>
            <div className="text-[18px] font-black tabular-nums tracking-tighter leading-none mb-1">{value}</div>
            <div className="text-[9px] font-bold opacity-70 uppercase tracking-tighter">{label}</div>
        </div>
    );
};

const TrendRow = ({ label, value, percent, type }: any) => {
    const colorClass = type === "danger" ? "text-rose-600" : "text-amber-600";
    return (
        <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-slate-500">{label}</span>
            <div className={`flex flex-col items-end ${colorClass}`}>
                <span className="font-black flex items-center gap-1">
                    <i className={`bx bx-trending-up`}></i> ▲ {value}
                </span>
                <span className="text-[10px] font-bold opacity-80">({percent})</span>
            </div>
        </div>
    );
};

export default EsgGhgSummaryCard;