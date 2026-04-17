"use client";

import { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { Project } from '@/ingredients/interface';
import Chart from './Chart';
import { GROUP_CONFIG } from '@/ingredients/object';
import FilterCards from './FilterCards';
import AuditModal from './AuditModal';

interface Props {
    projects: Project[];
    onSelect: (p: Project) => void;
}

export default function AuditInsightDashboard({ projects, onSelect }: Props) {
    const [mounted, setMounted] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);
    const [displayCount, setDisplayCount] = useState(30);
    const observerTarget = useRef<HTMLDivElement>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

    useEffect(() => { setMounted(true); }, []);

    const groupedData = useMemo(() => {
        return GROUP_CONFIG.map(group => {
            const items = projects.filter(p => {
                if (group.id === 'noDate') return p.dueDays === null || p.dueDays === undefined;
                return p.dueDays !== null && p.dueDays >= (group.range[0] as number) && p.dueDays <= (group.range[1] as number);
            });
            return { ...group, value: items.length, items, percentage: projects.length > 0 ? Math.round((items.length / projects.length) * 100) : 0 };
        });
    }, [projects]);

    const allFilteredList = useMemo(() => {
        let list = selectedGroupIds.length === 0
            ? projects
            : groupedData.filter(g => selectedGroupIds.includes(g.id)).flatMap(g => g.items);

        if (searchTerm) {
            const s = searchTerm.toLowerCase();
            list = list.filter(p => p.factoryName.toLowerCase().includes(s) || p.buyer.toLowerCase().includes(s));
        }
        return [...list].sort((a, b) => (a.dueDays ?? 999) - (b.dueDays ?? 999));
    }, [selectedGroupIds, groupedData, projects, searchTerm]);

    const visibleList = useMemo(() => allFilteredList.slice(0, displayCount), [allFilteredList, displayCount]);

    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting && displayCount < allFilteredList.length) {
            setDisplayCount(prev => prev + 20);
        }
    }, [displayCount, allFilteredList.length]);

    useEffect(() => {
        if (!mounted) return;
        const observer = new IntersectionObserver(handleObserver, { threshold: 0.1 });
        if (observerTarget.current) observer.observe(observerTarget.current);
        return () => observer.disconnect();
    }, [handleObserver, mounted]);

    if (!mounted) return null;

    return (
        <div className="w-full max-w-400 mx-auto ppaci-4 lg:p-6 space-y-6 text-[#2C3E50] bg-[#F4F7F9] min-h-screen font-sans">

            {/* 1. 헤더 영역 */}
            <div className="flex justify-between items-end pb-3 border-b-2 border-slate-200">
                <h2 className="text-2xl font-black tracking-tighter text-[#1A252F]">공장 평가 현황 </h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition"
                >
                    감사 현황 보기
                </button>
            </div>

            {/* 2. 상단 대시보드 섹션 - 반응형 순서 조정 (flex-col + order) */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* 🔥 강화된 파이 차트 영역 (모바일에서 order-1로 최상단 배치) */}
                <Chart groupedData={groupedData} len={projects.length} />

                {/* KPI 필터 카드 (모바일에서 order-2로 중간 배치) */}
                <FilterCards groupedData={groupedData} selectedGroupIds={selectedGroupIds} setSelectedGroupIds={setSelectedGroupIds} />
            </div>

            {/* 3. 상세 리스트 테이블 영역 (order-3) */}
            <div className="bg-white border-2 border-slate-100 rounded-lg shadow-sm flex flex-col h-162.5 overflow-hidden">
                <div className="px-5 py-4 bg-[#F8FAFC] border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                        <div className="w-1.5 h-5 bg-[#4E79A7] rounded-full" />
                        <h3 className="font-black text-base text-[#1A252F] tracking-tight">전체 공장 평가 현황 상세</h3>
                    </div>
                    <div className="relative w-full sm:w-80">
                        <input
                            type="text"
                            placeholder="공장명 또는 바이어 검색..."
                            className="w-full bg-white border border-slate-300 rounded-md py-2 pl-4 pr-10 text-[12px] font-bold focus:ring-2 focus:ring-[#4E79A7]/10 focus:border-[#4E79A7] outline-none transition-all placeholder-slate-300"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <i className='bx bx-search absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg'></i>
                    </div>
                </div>

                <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-slate-200">
                    <table className="w-full text-left border-collapse table-fixed min-w-200">
                        <thead className="sticky top-0 bg-[#F1F4F7] text-[#64748B] text-[10px] font-black uppercase tracking-wider z-20 border-b border-slate-200 shadow-sm">
                            <tr>
                                <th className="w-15 px-6 py-4 text-center">상태</th>
                                <th className="px-6 py-4">공장명 (Factory)</th>
                                <th className="px-6 py-4">바이어</th>
                                <th className="hidden md:table-cell w-[12%] px-6 py-4 text-center">유형</th>
                                <th className="w-30 px-6 py-4">남은 기간</th>
                                <th className="hidden lg:table-cell w-[15%] px-6 py-4 text-right pr-10">만료예정일</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {visibleList.map((p) => {
                                const group = GROUP_CONFIG.find(g => {
                                    if (g.id === 'noDate') return p.dueDays === null || p.dueDays === undefined;
                                    return p.dueDays !== null && p.dueDays >= (g.range[0] as number) && p.dueDays <= (g.range[1] as number);
                                }) || GROUP_CONFIG[6];

                                return (
                                    <tr key={p.id} onClick={() => onSelect(p)} className="group hover:bg-blue-50/30 transition-colors cursor-pointer text-[13px] font-bold text-slate-600 h-14">
                                        <td className="px-6 py-3 text-center">
                                            <div className="w-2.5 h-2.5 rounded-full mx-auto transition-all group-hover:scale-125 shadow-sm" style={{ backgroundColor: group.color }} />
                                        </td>
                                        <td className="px-6 py-3 text-[#1A252F] font-black truncate group-hover:text-[#4E79A7] group-hover:underline underline-offset-4 transition-all">
                                            {p.factoryName}
                                        </td>
                                        <td className="px-6 py-3 text-slate-400 font-medium truncate italic">{p.buyer}</td>
                                        <td className="hidden md:table-cell px-6 py-3 text-center">
                                            <span className="text-[10px] text-slate-400 border border-slate-100 px-2 py-0.5 rounded font-black">{p.auditType}</span>
                                        </td>
                                        <td className="px-6 py-3">
                                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-black border ${group.bgColor} ${group.textColor} ${group.border} shadow-sm inline-block`}>
                                                {p.dueDays === null ? '날짜미정' : p.dueDays < 0 ? `만료됨` : `D-${p.dueDays}`}
                                            </span>
                                        </td>
                                        <td className="hidden lg:table-cell px-6 py-3 text-right text-slate-400 font-mono text-[11px] pr-10 tracking-tight">{p.expiryDate}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <div ref={observerTarget} className="w-full h-20 flex items-center justify-center bg-white border-t border-slate-50">
                        {displayCount < allFilteredList.length && (
                            <div className="flex gap-1.5">
                                {[0, 1, 2].map(i => <div key={i} className="w-1.5 h-1.5 bg-[#4E79A7]/30 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <AuditModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}