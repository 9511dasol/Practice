import React, { useEffect } from 'react';

interface AuditModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuditModal = ({ isOpen, onClose }: AuditModalProps) => {
    // ESC 키 이벤트 바인딩
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden'; // 스크롤 방지
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* 배경 Overlay: 클릭 시 닫힘 */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* 모달 본체 */}
            <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200">
                {/* 헤더 */}
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                    <h2 className="text-base font-bold text-slate-800">감사 현황 상세</h2>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* 컨텐츠 스크롤 영역 */}
                <div className="max-h-[70vh] overflow-y-auto p-5 space-y-6">

                    {/* 감사 일정 섹션 */}
                    <section>
                        <div className="mb-3 flex items-center justify-between px-1">
                            <span className="text-sm font-bold text-slate-700">감사 일정 (예정)</span>
                            <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-600 ring-1 ring-inset ring-amber-500/20">3건</span>
                        </div>
                        <div className="space-y-2">
                            {/* 항목 1 */}
                            <div className="rounded-xl border-l-4 border-red-500 bg-red-50/50 p-3 shadow-sm ring-1 ring-inset ring-red-500/10">
                                <div className="text-[11px] font-bold text-red-600">인도네시아 2공장</div>
                                <div className="mt-0.5 text-[13px] font-medium text-slate-800">Buyer A 정기 감사 (재감사)</div>
                                <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500">
                                    <span>📅 2025-04-07</span>
                                    <span className="h-2 w-[1px] bg-slate-300" />
                                    <span>👤 담당: 이○○</span>
                                </div>
                            </div>

                            {/* 항목 2 */}
                            <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50/50 p-3 shadow-sm ring-1 ring-inset ring-amber-500/10">
                                <div className="text-[11px] font-bold text-amber-600">중국 협력공장</div>
                                <div className="mt-0.5 text-[13px] font-medium text-slate-800">Buyer C 신규 감사</div>
                                <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500">
                                    <span>📅 2025-05-12</span>
                                    <span className="h-2 w-[1px] bg-slate-300" />
                                    <span>👤 담당: 박○○</span>
                                </div>
                            </div>

                            {/* 항목 3 */}
                            <div className="rounded-xl border-l-4 border-blue-500 bg-blue-50/50 p-3 shadow-sm ring-1 ring-inset ring-blue-500/10">
                                <div className="text-[11px] font-bold text-blue-600">베트남 1공장</div>
                                <div className="mt-0.5 text-[13px] font-medium text-slate-800">Buyer A·C 통합 감사</div>
                                <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500">
                                    <span>📅 2025-05-28</span>
                                    <span className="h-2 w-[1px] bg-slate-300" />
                                    <span>👤 담당: 김○○</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 감사 이력 섹션 */}
                    <section>
                        <div className="mb-3 flex items-center justify-between px-1">
                            <span className="text-sm font-bold text-slate-700">감사 이력</span>
                            <span className="text-[11px] text-slate-400">최근 6개월</span>
                        </div>
                        <div className="overflow-hidden rounded-xl border border-slate-200">
                            <table className="w-full text-left text-[12px]">
                                <thead className="bg-slate-50 text-slate-500">
                                    <tr>
                                        <th className="px-3 py-2.5 font-semibold">공장</th>
                                        <th className="px-3 py-2.5 font-semibold">감사 유형</th>
                                        <th className="px-3 py-2.5 font-semibold text-center">결과</th>
                                        <th className="px-3 py-2.5 font-semibold text-center">날짜</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-slate-700">
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <td className="px-3 py-2.5">방글라데시</td>
                                        <td className="px-3 py-2.5 text-slate-500">Buyer B 정기</td>
                                        <td className="px-3 py-2.5 text-center">
                                            <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">통과</span>
                                        </td>
                                        <td className="px-3 py-2.5 text-center text-slate-400">2025-03-01</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <td className="px-3 py-2.5">베트남 1공장</td>
                                        <td className="px-3 py-2.5 text-slate-500">Buyer A 정기</td>
                                        <td className="px-3 py-2.5 text-center">
                                            <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">통과</span>
                                        </td>
                                        <td className="px-3 py-2.5 text-center text-slate-400">2025-02-14</td>
                                    </tr>
                                    <tr className="bg-rose-50/30 hover:bg-rose-50/50">
                                        <td className="px-3 py-2.5 font-medium">인도네시아 2</td>
                                        <td className="px-3 py-2.5 text-slate-500">Buyer A 정기</td>
                                        <td className="px-3 py-2.5 text-center">
                                            <span className="rounded-md bg-rose-100 px-1.5 py-0.5 text-[10px] font-bold text-rose-700">재감사</span>
                                        </td>
                                        <td className="px-3 py-2.5 text-center text-slate-400">2025-01-20</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <td className="px-3 py-2.5">중국 협력공장</td>
                                        <td className="px-3 py-2.5 text-slate-500">자체 점검</td>
                                        <td className="px-3 py-2.5 text-center">
                                            <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">조건부</span>
                                        </td>
                                        <td className="px-3 py-2.5 text-center text-slate-400">2024-12-10</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AuditModal;