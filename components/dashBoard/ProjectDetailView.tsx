"use client";

import { DetailedProject } from '@/ingredients/interface'
import { useRouter } from 'next/navigation';
import React from 'react';

const tabs = [
  { id: 'overview', label: '개요', icon: 'bx-info-circle' },
  { id: 'audit', label: '인증/감사', icon: 'bx-certification' },
  { id: 'gap', label: '바이어 기준 평가', icon: 'bx-git-compare' }, // 핵심!
  { id: 'action', label: 'Action 관리', icon: 'bx-task' },
];

const getStatusStyles = (days: number) => {
    if (days < 0) return {
        text: 'text-red-600',
        bg: 'bg-red-50',
        border: 'border-red-100',
        icon: 'bx-error-circle',
        label: 'Overdue'
    };
    if (days <= 30) return {
        text: 'text-orange-600',
        bg: 'bg-orange-50',
        border: 'border-orange-100',
        icon: 'bx-timer',
        label: 'Due Soon'
    };
    return {
        text: 'text-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-100',
        icon: 'bx-check-double',
        label: 'Compliant'
    };
};

export default function ProjectDetailView({ data }: { data: DetailedProject }) {
    const router = useRouter(); // Next.js 라우터 훅

    // 0. 뒤로가기 함수
    const handleBack = () => {
        router.back();
    };
    // 1. 실시간 날짜 계산 로직
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expireDate = new Date(data.expiryDate);
    expireDate.setHours(0, 0, 0, 0);

    const diffTime = expireDate.getTime() - today.getTime();
    const realDueDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const status = getStatusStyles(realDueDays);

    return (
        <div className="w-full max-w-5xl mx-auto space-y-4 font-sans animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* 상단 네비게이션 액션바 */}
            <div className="flex items-center justify-between px-2">
                <button
                    onClick={handleBack}
                    className="group flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-all font-bold text-sm"
                >
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:border-slate-400 transition-all">
                        <i className='bx bx-left-arrow-alt text-xl'></i>
                    </div>
                    <span>Back to List</span>
                </button>

                <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
                    Audit Management / Detailed View
                </div>
            </div>
            <div className="bg-white rounded-4xl border-2 border-slate-100 shadow-2xl overflow-hidden">


                {/* Header: 상단 핵심 요약 */}
                <div className={`p-8 border-b border-slate-50 ${status.bg}/30`}>
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-black tracking-widest uppercase">
                                    ID: {data.fctId}
                                </span>
                                <span className={`px-3 py-1 rounded-full border ${status.bg} ${status.text} ${status.border} text-[10px] font-black uppercase`}>
                                    {data.dueBucket}
                                </span>
                            </div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">
                                {data.factoryName}
                            </h1>
                            <div className="flex items-center gap-4 text-slate-400 font-bold text-sm">
                                <span className="flex items-center gap-1"><i className='bx bx-globe'></i> {data.co}</span>
                                <span className="text-slate-200">|</span>
                                <span className="flex items-center gap-1"><i className='bx bx-purchase-tag'></i> {data.tCode || 'No T-Code'}</span>
                            </div>
                        </div>

                        {/* D-Day 위젯 */}
                        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5 min-w-50">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${status.bg} ${status.text}`}>
                                <i className={`bx ${status.icon}`}></i>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{status.label}</p>
                                <div className="flex items-baseline gap-1">
                                    <span className={`text-2xl font-black ${realDueDays < 0 ? 'text-red-600' : 'text-slate-900'}`}>
                                        {Math.abs(realDueDays)}
                                    </span>
                                    <span className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Days</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 핵심 KPI 카드 섹션 */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <InfoCard icon="bx-user-voice" label="Buyer" value={data.buyer} accent="blue" />
                        <InfoCard icon="bx-file-find" label="Audit Type" value={data.auditType} accent="purple" />
                        <InfoCard icon="bx-user-check" label="Lead Auditor" value={data.latestAuditor || 'Unassigned'} accent="orange" />
                        <InfoCard icon="bx-calendar-x" label="Expiry Date" value={data.expiryDate} accent="emerald" />
                    </div>
                </div>

                {/* Body: 상세 정보 그리드 */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">

                    {/* 왼쪽: Factory & Identity */}
                    <section className="space-y-6">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                            <i className='bx bx-buildings text-lg text-blue-600'></i> Factory Information
                        </h3>
                        <div className="bg-slate-50/50 rounded-2xl p-2 space-y-1">
                            <DetailItem label="Factory Key" value={data.factoryKey} isCopyable />
                            <DetailItem label="FCT ID" value={data.fctId} />
                            <DetailItem label="Sequence No" value={data.rowSeq.toString()} />
                            <DetailItem label="T-Code" value={data.tCode || 'N/A'} />
                        </div>
                    </section>

                    {/* 오른쪽: Audit Status & Remarks */}
                    <section className="space-y-6">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                            <i className='bx bx-history text-lg text-orange-500'></i> Audit Status
                        </h3>
                        <div className="bg-slate-50/50 rounded-2xl p-2 space-y-1">
                            <DetailItem label="Last Audit" value={data.latestAuditDate} />
                            <DetailItem label="Expiration" value={data.expiryDate} highlight={realDueDays < 30} />
                            <DetailItem label="Status Text" value={data.statusText || 'Normal'} />
                            <DetailItem label="Updated At" value={new Date(data.updatedAt).toLocaleDateString()} isLast />
                        </div>
                    </section>

                    {/* 하단 전체 영역: Remarks (비고) */}
                    <section className="md:col-span-2 space-y-4">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                            <i className='bx bx-note text-lg text-emerald-500'></i> Internal Remarks
                        </h3>
                        <div className="bg-amber-50/30 border border-amber-100/50 rounded-2xl p-6">
                            <p className="text-slate-600 leading-relaxed font-medium">
                                {data.remarks || "No additional remarks recorded for this factory audit case."}
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

// --- 하위 UI 컴포넌트 ---

function InfoCard({ icon, label, value, accent }: { icon: string, label: string, value: string, accent: string }) {
    const accents: any = {
        blue: "text-blue-600 bg-blue-50",
        purple: "text-purple-600 bg-purple-50",
        orange: "text-orange-600 bg-orange-50",
        emerald: "text-emerald-600 bg-emerald-50"
    };
    return (
        <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-4 transition-all hover:border-slate-300 hover:shadow-md group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-transform group-hover:scale-110 ${accents[accent]}`}>
                <i className={`bx ${icon}`}></i>
            </div>
            <div className="overflow-hidden">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{label}</p>
                <p className="font-black text-slate-800 tracking-tight truncate">{value}</p>
            </div>
        </div>
    );
}

function DetailItem({ label, value, highlight = false, isLast = false, isCopyable = false }: any) {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);

            // 2초 후 다시 원래 아이콘으로 복구
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('복사 실패:', err);
        }
    };

    return (
        <div className={`flex justify-between items-center p-4 ${!isLast ? 'border-b border-slate-100/50' : ''}`}>
            <span className="text-[11px] font-bold text-slate-400 uppercase">{label}</span>
            <div className="flex items-center gap-2">
                <span className={`text-sm font-black ${highlight ? 'text-red-600' : 'text-slate-700'}`}>
                    {value}
                </span>

                {isCopyable && (
                    <button
                        onClick={() => handleCopy(value)}
                        className="flex items-center justify-center transition-all duration-300"
                        title="Click to copy"
                    >
                        {copied ? (
                            // 복사 성공 시 체크 아이콘으로 변경
                            <i className='bx bx-check text-emerald-500 animate-bounce'></i>
                        ) : (
                            // 기본 복사 아이콘
                            <i className='bx bx-copy text-slate-300 hover:text-blue-500 cursor-pointer transition-colors'></i>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}