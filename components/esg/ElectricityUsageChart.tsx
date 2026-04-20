import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

// 1. 차트에 주입할 데이터 배열 (API에서 받아올 데이터 구조)
const chartData = [
    {
        name: '인도네시아 2',
        y2024: 4820,
        y2023: 4550,
        y2022: 4200,
    },
    {
        name: '방글라데시',
        y2024: 3110,
        y2023: 2980,
        y2022: 2750,
    },
    {
        name: '중국 협력',
        y2024: 5940,
        y2023: 5200,
        y2022: 4800,
    },
    {
        name: '베트남 1',
        y2024: null, // 미입력 데이터는 null 처리
        y2023: 4100,
        y2022: 3800,
    },
    {
        name: '인도 3',
        y2024: null,
        y2023: null,
        y2022: null,
    },
];

// 2. 미입력(null) 데이터를 처리하기 위한 커스텀 툴팁
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-lg border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur-sm">
                <p className="mb-2 border-b border-slate-100 pb-1 text-xs font-bold text-slate-800">
                    {label}
                </p>
                {payload.map((entry: any, index: number) => {
                    const isMissing = entry.value === null || entry.value === undefined;
                    return (
                        <div key={index} className="flex items-center justify-between gap-4 py-0.5 text-[11px]">
                            <div className="flex items-center gap-1.5">
                                <span
                                    className="h-2 w-2 rounded-full"
                                    style={{ backgroundColor: entry.color }}
                                ></span>
                                <span className="text-slate-600">{entry.name}</span>
                            </div>
                            <span className={`font-semibold ${isMissing ? 'text-amber-500' : 'text-slate-800'}`}>
                                {isMissing ? '미입력' : `${entry.value.toLocaleString()}k`}
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    }
    return null;
};

export default function ElectricityUsageChart() {
    return (
        <div className="w-full max-w-4xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {/* Header 영역 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 bg-slate-50 px-5 py-4 gap-3">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-blue-100 text-blue-600">
                        <i className="bx bx-bolt-circle text-xl"></i>
                    </div>
                    <span className="text-sm font-bold text-slate-800">
                        공장별 Electricity 사용량 연도 비교
                    </span>
                </div>
                <div className="flex items-center gap-1.5 self-start sm:self-auto rounded-full bg-slate-200/50 px-3 py-1 text-[11px] font-medium text-slate-500">
                    <i className="bx bx-bar-chart-alt-2"></i>
                    <span>kWh 기준 · 막대 길이 = 상대적 사용량</span>
                </div>
            </div>

            {/* Chart 영역 (ResponsiveContainer 적용) */}
            <div className="p-4 sm:p-6 w-full h-[350px] sm:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        layout="vertical"
                        data={chartData}
                        margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
                        barGap={2}     // 막대 사이 간격
                        barCategoryGap={20} // 그룹 사이 간격
                    >
                        {/* 배경 눈금선 (세로줄만 표시하여 깔끔하게) */}
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />

                        {/* X축 (값) */}
                        <XAxis
                            type="number"
                            tick={{ fontSize: 10, fill: '#94a3b8' }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(value) => `${value / 1000}M`} // 5000k -> 5M 형태로 축약 표시 (선택사항)
                        />

                        {/* Y축 (공장 이름) */}
                        <YAxis
                            dataKey="name"
                            type="category"
                            axisLine={false}
                            tickLine={false}
                            width={90}
                            tick={{ fontSize: 11, fontWeight: 600, fill: '#475569' }}
                        />

                        {/* 커스텀 툴팁 */}
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />

                        {/* 범례 */}
                        <Legend
                            wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                            iconType="circle"
                        />

                        {/* 연도별 막대 (radius를 주어 둥글게 처리) */}
                        <Bar dataKey="y2024" name="2024 (당해)" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                        <Bar dataKey="y2023" name="2023 (전년)" fill="#10b981" radius={[0, 4, 4, 0]} />
                        <Bar dataKey="y2022" name="2022" fill="#cbd5e1" radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}