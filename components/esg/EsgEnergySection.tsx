"use client";

import { useState } from "react";
import { EsgTabNav } from "./EsgTabNav";
import { EsgDataRow } from "./EsgDataRow";
import { ChangeSpan } from "./ChangeSpan";
import ElectricityUsageChart from "./ElectricityUsageChart";
import EsgDataUploadCard from "./EsgDataUploadCard";
import EsgGhgSummaryCard from "./EsgGhgSummaryCard";

export type EsgEnergyCells = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

export type EsgDataset = {
  title: string;
  elec: EsgEnergyCells;
  diesel: EsgEnergyCells;
  petrol: EsgEnergyCells;
  lpg: EsgEnergyCells;
  rec: EsgEnergyCells;
  biodiesel: EsgEnergyCells;
  biomass: EsgEnergyCells;
  woBio: string;
  wBio: string;
  w23: string;
  w22: string;
  d24: string;
  d23: string;
};
export const ESG_DATA: Record<EsgTabKey, EsgDataset> = {
  all: {
    title: "에너지 사용량 — 전체 합산",
    elec: ["4,820,000", "3,856", "4,550,000", "3,640", "4,200,000", "3,360", "▲5.9%", "▲8.3%"],
    diesel: ["12,400", "33.1", "13,200", "35.2", "14,800", "39.5", "▼6.1%", "▼10.8%"],
    petrol: ["3,200", "7.5", "3,100", "7.3", "2,900", "6.8", "▲3.2%", "▲6.9%"],
    lpg: ["1,850", "5.4", "1,720", "5.0", "1,600", "4.7", "▲7.6%", "▲7.5%"],
    rec: ["320,000", "—", "180,000", "—", "—", "—", "▲77.8%", "신규"],
    // 🌟 새로 추가된 데이터
    biodiesel: ["4,500", "0.2", "3,200", "0.1", "1,100", "0.05", "▲40.6%", "▲190.9%"],
    biomass: ["15,000", "0", "12,000", "0", "—", "—", "▲25.0%", "신규"],
    woBio: "3,902",
    wBio: "3,902",
    w23: "3,688",
    w22: "3,411",
    d24: "▲5.8%",
    d23: "▲8.1%",
  },
  vn: {
    title: "에너지 사용량 — 베트남 1공장",
    elec: ["—", "—", "4,100,000", "3,280", "3,800,000", "3,040", "미입력", "▲7.9%"],
    diesel: ["—", "—", "3,200", "8.5", "3,500", "9.3", "미입력", "▼8.6%"],
    petrol: ["—", "—", "800", "1.9", "750", "1.8", "미입력", "▲6.7%"],
    lpg: ["—", "—", "420", "1.2", "400", "1.2", "미입력", "▲5.0%"],
    rec: ["—", "—", "—", "—", "—", "—", "—", "—"],
    // 🌟 새로 추가된 데이터
    biodiesel: ["—", "—", "1,200", "0.05", "500", "0.02", "미입력", "▲140.0%"],
    biomass: ["—", "—", "—", "—", "—", "—", "—", "—"],
    woBio: "미입력",
    wBio: "미입력",
    w23: "3,290",
    w22: "3,041",
    d24: "미입력",
    d23: "▲8.2%",
  },
  id: {
    title: "에너지 사용량 — 인도네시아 2공장",
    elec: ["1,650,000", "1,320", "1,580,000", "1,264", "1,450,000", "1,160", "▲4.4%", "▲9.0%"],
    diesel: ["4,200", "11.2", "4,500", "12.0", "5,100", "13.6", "▼6.7%", "▼11.8%"],
    petrol: ["900", "2.1", "870", "2.0", "810", "1.9", "▲3.4%", "▲7.4%"],
    lpg: ["620", "1.8", "580", "1.7", "540", "1.6", "▲6.9%", "▲7.4%"],
    rec: ["120,000", "—", "80,000", "—", "—", "—", "▲50.0%", "신규"],
    // 🌟 새로 추가된 데이터
    biodiesel: ["1,500", "0.1", "1,000", "0.04", "—", "—", "▲50.0%", "신규"],
    biomass: ["5,000", "0", "4,000", "0", "—", "—", "▲25.0%", "신규"],
    woBio: "1,335",
    wBio: "1,335",
    w23: "1,278",
    w22: "1,175",
    d24: "▲4.5%",
    d23: "▲8.8%",
  },
  bd: {
    title: "에너지 사용량 — 방글라데시 공장",
    elec: ["1,100,000", "880", "1,050,000", "840", "980,000", "784", "▲4.8%", "▲7.1%"],
    diesel: ["2,800", "7.5", "2,900", "7.7", "3,000", "8.0", "▼3.4%", "▼3.3%"],
    petrol: ["500", "1.2", "480", "1.1", "450", "1.1", "▲4.2%", "▲6.7%"],
    lpg: ["380", "1.1", "350", "1.0", "320", "0.9", "▲8.6%", "▲9.4%"],
    rec: ["100,000", "—", "60,000", "—", "—", "—", "▲66.7%", "신규"],
    // 🌟 새로 추가된 데이터
    biodiesel: ["—", "—", "—", "—", "—", "—", "—", "—"],
    biomass: ["—", "—", "—", "—", "—", "—", "—", "—"],
    woBio: "889",
    wBio: "889",
    w23: "850",
    w22: "794",
    d24: "▲4.6%",
    d23: "▲7.1%",
  },
  cn: {
    title: "에너지 사용량 — 중국 협력공장",
    elec: ["2,070,000", "1,656", "1,820,000", "1,456", "1,970,000", "1,576", "▲13.7%", "▼7.6%"],
    diesel: ["5,400", "14.4", "5,600", "14.9", "6,200", "16.6", "▼3.6%", "▼9.7%"],
    petrol: ["800", "1.9", "750", "1.8", "690", "1.6", "▲6.7%", "▲8.7%"],
    lpg: ["850", "2.5", "770", "2.2", "740", "2.1", "▲10.4%", "▲4.1%"],
    rec: ["100,000", "—", "40,000", "—", "—", "—", "▲150.0%", "신규"],
    // 🌟 새로 추가된 데이터
    biodiesel: ["1,800", "0.1", "1,000", "0.01", "600", "0.03", "▲80.0%", "▲66.7%"],
    biomass: ["10,000", "0", "8,000", "0", "—", "—", "▲25.0%", "신규"],
    woBio: "1,675",
    wBio: "1,675",
    w23: "1,474",
    w22: "1,196",
    d24: "▲13.6%",
    d23: "▲23.2%",
  },
  in: {
    title: "에너지 사용량 — 인도 3공장",
    elec: ["—", "—", "—", "—", "—", "—", "미입력", "미입력"],
    diesel: ["—", "—", "—", "—", "—", "—", "미입력", "미입력"],
    petrol: ["—", "—", "—", "—", "—", "—", "미입력", "미입력"],
    lpg: ["—", "—", "—", "—", "—", "—", "미입력", "미입력"],
    rec: ["—", "—", "—", "—", "—", "—", "—", "—"],
    // 🌟 새로 추가된 데이터
    biodiesel: ["—", "—", "—", "—", "—", "—", "미입력", "미입력"],
    biomass: ["—", "—", "—", "—", "—", "—", "미입력", "미입력"],
    woBio: "미입력",
    wBio: "미입력",
    w23: "미입력",
    w22: "미입력",
    d24: "—",
    d23: "—",
  },
};
export const ESG_TAB_KEYS = ["all", "vn", "id", "bd", "cn", "in"] as string[];

export type EsgTabKey = (typeof ESG_TAB_KEYS)[number];

const TAB_LABELS: Record<EsgTabKey, string> = {
  all: "전체 합산",
  vn: "베트남 1공장",
  id: "인도네시아 2공장",
  bd: "방글라데시",
  cn: "중국 협력공장",
  in: "인도 3공장",
};

export default function EsgEnergySection() {
  const [tab, setTab] = useState<EsgTabKey>("all");
  const d = ESG_DATA[tab];
  const [confirmBio, setConfirmBio] = useState<boolean>(true);
  return (
    <section className="space-y-4">
      {/* 탭 네비게이션 (반응형 대응) */}
      <EsgTabNav
        currentTab={tab}
        tabs={ESG_TAB_KEYS}
        labels={TAB_LABELS}
        onTabChange={setTab}
      />

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* 헤더 영역 */}
        <div className="flex flex-col gap-3 border-b border-slate-100 p-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <span className="h-3 w-1 bg-blue-600 rounded-full" />
            {d.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              className={`rounded-md px-2 py-1 text-[10px] ${confirmBio ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}
              onClick={() => setConfirmBio(prev => !prev)}
            >
              {confirmBio ? "BIO: 바이오 포함" : "BIO: 바이오 제외"}
            </button>
          </div>
        </div>

        {/* 테이블 영역 (가로 스크롤) */}
        <div className="w-full rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto overflow-y-hidden">
            <table className="w-full min-w-[900px] border-separate border-spacing-0">
              <thead>
                {/* 상단 메인 연도 헤더: py-4 -> py-2.5 */}
                <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="sticky left-0 z-20 border-b border-r border-slate-200 bg-slate-50 px-5 py-2.5 text-left align-middle">
                    <div className="flex items-center gap-2 text-slate-600">
                      <i className="bx bx-category text-base"></i>
                      <span>에너지원</span>
                    </div>
                  </th>
                  <th
                    colSpan={2}
                    className="border-b border-r border-slate-200 bg-blue-50/60 py-2.5 text-blue-700"
                  >
                    2024 (당해)
                  </th>
                  <th
                    colSpan={2}
                    className="border-b border-r border-slate-200 bg-emerald-50/60 py-2.5 text-emerald-700"
                  >
                    2023 (전년)
                  </th>
                  <th
                    colSpan={2}
                    className="border-b border-r border-slate-200 bg-slate-50/80 py-2.5 text-slate-600"
                  >
                    2022
                  </th>
                  <th
                    colSpan={2}
                    className="border-b bg-amber-50/50 py-2.5 text-amber-700"
                  >
                    연도별 증감
                  </th>
                </tr>

                {/* 하단 세부 항목 헤더: py-3 -> py-1.5 */}
                <tr className="bg-slate-50 text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                  <th className="sticky left-0 z-20 border-b border-r border-slate-200 bg-slate-50 px-5 py-1.5"></th>
                  <th className="border-b border-slate-200 px-3 py-1.5">사용량</th>
                  <th className="border-b border-r border-slate-200 px-3 py-1.5">GHG</th>
                  <th className="border-b border-slate-200 px-3 py-1.5">사용량</th>
                  <th className="border-b border-r border-slate-200 px-3 py-1.5">GHG</th>
                  <th className="border-b border-slate-200 px-3 py-1.5">사용량</th>
                  <th className="border-b border-r border-slate-200 px-3 py-1.5">GHG</th>
                  <th className="border-b border-slate-200 px-3 py-1.5 text-nowrap">24 ← 23</th>
                  <th className="border-b border-slate-200 px-3 py-1.5 text-nowrap">23 ← 22</th>
                </tr>
              </thead>
              <tbody>
                <EsgDataRow
                  iconClass="bx-plug"
                  label="Electricity"
                  unit="kWh"
                  cells={d.elec}
                />
                <EsgDataRow
                  iconClass="bxs-cylinder"
                  label="Diesel"
                  unit="L"
                  cells={d.diesel}
                  isAlt
                />
                <EsgDataRow
                  iconClass="bx-gas-pump"
                  label="Petrol"
                  unit="L"
                  cells={d.petrol}
                />
                <EsgDataRow
                  iconClass="bxs-flame"
                  label="LPG"
                  unit="kg"
                  cells={d.lpg}
                  isAlt
                />
                <EsgDataRow
                  iconClass="bx-recycle"
                  label="REC/APC"
                  unit="kWh"
                  cells={d.rec}
                />
                {confirmBio && (
                  <EsgDataRow
                    iconClass="bx-droplet" // 액체 연료 느낌의 물방울 아이콘
                    label="Biodiesel"
                    unit="L"
                    cells={d.biodiesel}
                  />
                )}
                {confirmBio && (
                  <EsgDataRow
                    iconClass="bx-leaf" // 고체/자연 유래 연료 느낌의 나뭇잎 아이콘
                    label="Biomass"
                    unit="kg"
                    cells={d.biomass}
                  />)}

                {/* 합계행 (Highlight - Bio 포함/제외 병기) */}
                <tr className="bg-slate-800 text-white shadow-[0_-4px_10px_-2px_rgba(0,0,0,0.15)] relative z-30">
                  <td className="sticky left-0 z-30 border-r border-slate-700 bg-slate-800 px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 ring-1 ring-inset ring-blue-500/30">
                        <i className="bx bx-bar-chart-alt-2 text-lg text-blue-400"></i>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold tracking-wide">
                          GHG 합계
                          <span className="text-[10px] text-slate-400 font-normal ml-1.5">
                            (tCO₂)
                          </span>
                        </span>
                        {/* 바이오 데이터 안내 태그 */}
                        <span className="text-[9px] font-medium text-blue-300/80 mt-0.5">
                          바이오매스 배출량 포함 기준
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* 2024 당해 (With Bio & Without Bio 병기) */}
                  <td
                    colSpan={2}
                    className="border-r border-slate-700 bg-slate-800/50 px-4 py-2 align-middle"
                  >
                    <div className="flex flex-col items-center justify-center gap-1">
                      <span className="text-blue-300 font-black tracking-wide text-[16px] leading-none">
                        {d.wBio}
                      </span>
                      {/* 데이터가 있을 경우에만 '제외' 수치 표시 */}
                      {d.woBio && d.woBio !== "미입력" && confirmBio && (
                        <span className="rounded bg-slate-700/60 px-1.5 py-0.5 text-[9px] font-semibold text-slate-300 tracking-tight">
                          제외시: {d.woBio}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* 2023 전년 */}
                  <td
                    colSpan={2}
                    className="px-4 py-3 text-center align-middle border-r border-slate-700"
                  >
                    <span className="text-emerald-300 font-black tracking-wide text-[15px]">
                      {d.w23}
                    </span>
                  </td>

                  {/* 2022 */}
                  <td
                    colSpan={2}
                    className="px-4 py-3 text-center align-middle border-r border-slate-700"
                  >
                    <span className="text-slate-200 font-bold tracking-wide text-[14px]">
                      {d.w22}
                    </span>
                  </td>

                  {/* 증감분 24 <- 23 */}
                  <td className="px-4 py-3 text-center align-middle">
                    <ChangeSpan val={d.d24} />
                  </td>

                  {/* 증감분 23 <- 22 */}
                  <td className="px-4 py-3 text-center align-middle">
                    <ChangeSpan val={d.d23} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* 푸터 가이드 */}
        <div className="bg-slate-50 px-4 py-2 text-[10px] text-slate-400 flex flex-wrap gap-x-4 gap-y-1">
          <span>▲ 증가 / ▼ 감소</span>
          <span>REC/APC는 상쇄분으로 합계 제외</span>
          <span className="ml-auto italic">기준일: 2025-03-23</span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2 xl:grid-cols-4 w-full max-w-[1600px] mx-auto p-4">
        {/* 1. 차트 영역: 모바일/태블릿에선 전체 폭(100%), 데스크탑(xl)에선 절반(50%) 차지 */}
        <div className="lg:col-span-2 xl:col-span-2 w-full">
          <ElectricityUsageChart />
        </div>

        {/* 2. 카드 영역: 데스크탑(xl)에서 차트 우측에 한 줄로 나란히 배치 */}
        <aside className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:col-span-2 xl:col-span-2 w-full">
          <EsgDataUploadCard />
          <EsgGhgSummaryCard />
        </aside>
      </div>

    </section>
  );
}
