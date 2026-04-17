"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // 에러 로그를 서비스에 기록할 수 있습니다.
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-[#F4F7F9] flex items-center justify-center p-6 font-sans">
            <div className="max-w-md w-full bg-white border-2 border-slate-100 rounded-2xl p-10 shadow-2xl shadow-slate-200/50 text-center relative overflow-hidden">

                {/* 상단 장식용 바 (리스크 컬러 적용) */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-red-500"></div>

                {/* 에러 아이콘 컨테이너 */}
                <div className="mb-8 relative inline-block">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                        <i className="bx bx-error-alt text-4xl text-red-500 animate-pulse"></i>
                    </div>
                    {/* 보조 아이콘 */}
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-100">
                        <i className="bx bx-bug text-lg text-slate-400"></i>
                    </div>
                </div>

                {/* 텍스트 영역 */}
                <div className="space-y-3 mb-10">
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                        System Analysis Interrupted
                    </span>
                    <h2 className="text-2xl font-black text-[#1A252F] tracking-tight">
                        데이터 분석 중 오류 발생
                    </h2>
                    <p className="text-sm font-bold text-slate-500 leading-relaxed px-4">
                        대시보드를 불러오는 과정에서 예기치 못한 기술적 문제가 발생했습니다. 데이터 연결 상태를 확인해 주세요.
                    </p>
                </div>

                {/* 액션 버튼 영역 */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={() => reset()}
                        className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
                    >
                        <i className="bx bx-refresh text-xl"></i>
                        다시 시도하기
                    </button>

                    <Link
                        href="/"
                        className="flex-1 flex items-center justify-center gap-2 bg-white text-slate-600 border-2 border-slate-100 px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all active:scale-95"
                    >
                        <i className="bx bx-home-alt text-xl"></i>
                        홈으로 이동
                    </Link>
                </div>

                {/* 하단 시스템 정보 */}
                <div className="mt-10 pt-6 border-t border-slate-50">
                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                        Error Digest: {error.digest || "Internal System Error"}
                    </p>
                </div>
            </div>
        </div>
    );
}