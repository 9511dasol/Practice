import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData as ChartJSData,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Chart.js 필수 요소 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

// 1. 기존 데이터 구조 (API에서 받아올 데이터)
const chartData = [
  { name: "인도네시아 2", y2024: 4820, y2023: 4550, y2022: 4200 },
  { name: "방글라데시", y2024: 3110, y2023: 2980, y2022: 2750 },
  { name: "중국 협력", y2024: 5940, y2023: 5200, y2022: 4800 },
  { name: "베트남 1", y2024: null, y2023: 4100, y2022: 3800 },
  { name: "인도 3", y2024: null, y2023: null, y2022: null },
];

// 2. Chart.js용 데이터로 변환
const data: ChartJSData<"bar"> = {
  labels: chartData.map((d) => d.name),
  datasets: [
    {
      label: "2024 (당해)",
      data: chartData.map((d) => d.y2024),
      backgroundColor: "#3b82f6", // blue-500
      borderRadius: 4, // 막대 끝 둥글게
      barPercentage: 0.85,
      categoryPercentage: 0.8,
    },
    {
      label: "2023 (전년)",
      data: chartData.map((d) => d.y2023),
      backgroundColor: "#10b981", // emerald-500
      borderRadius: 4,
      barPercentage: 0.85,
      categoryPercentage: 0.8,
    },
    {
      label: "2022",
      data: chartData.map((d) => d.y2022),
      backgroundColor: "#cbd5e1", // slate-300
      borderRadius: 4,
      barPercentage: 0.85,
      categoryPercentage: 0.8,
    },
  ],
};

// 3. Chart.js 커스텀 옵션 설정
const options: ChartOptions<"bar"> = {
  indexAxis: "y" as const, // 가로형 막대그래프 설정
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index", // 마우스 호버 시 동일 선상의 모든 연도 데이터를 툴팁에 표시
    axis: 'y',
    intersect: false,
  },
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        usePointStyle: true, // 범례 아이콘을 원형으로 표시
        font: { size: 11, family: "inherit" },
        color: "#64748b", // text-slate-500
        padding: 20,
      },
    },
    tooltip: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      titleColor: "#1e293b", // text-slate-800
      bodyColor: "#475569", // text-slate-600
      borderColor: "#e2e8f0", // border-slate-200
      borderWidth: 1,
      padding: 12,
      boxPadding: 6,
      usePointStyle: true,
      titleFont: { size: 12, weight: "bold" },
      bodyFont: { size: 11 },
      callbacks: {
        // 커스텀 툴팁 로직 (미입력 처리)
        label: function (context) {
          const label = context.dataset.label || "";
          const value = context.raw as number | null;

          if (value === null || value === undefined) {
            return `${label}: 미입력`;
          }
          return `${label}: ${value.toLocaleString()}k`;
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        color: "#f1f5f9", // 연한 세로 눈금선
        drawTicks: false,
      },
      ticks: {
        font: { size: 10 },
        color: "#94a3b8",
        callback: function (value) {
          // 5000k -> 5M 형태로 축약 (선택사항)
          return `${(value as number) / 1000}M`;
        },
      },
      border: { display: false }, // X축 가장 하단 진한 선 제거
    },
    y: {
      grid: {
        display: false, // Y축 가로 눈금선 제거
      },
      ticks: {
        font: { size: 11, weight: 600, family: "inherit" },
        color: "#475569",
      },
      border: { display: false },
    },
  },
};

export default function ElectricityUsageChart() {
  return (
    <div className="w-full max-w-4xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header 영역 (기존과 동일) */}
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

      {/* Chart 영역 (react-chartjs-2 적용) */}
      <div className="p-4 sm:p-6 w-full">
        {/* 패딩(p-4)과 크기 지정(h-350px) 컨테이너를 분리합니다 */}
        <div className="relative w-full h-87.5 sm:h-100">
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  );
}
