"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// 알림 표시 상태 관리 (예시를 위해 컴포넌트 내부에 배치)
export default function SuccessToast({ message = "데이터 보내기 성공!!" }: { message: string }) {
    const [isVisible, setIsVisible] = useState(true);

    // 3초 후 자동으로 사라지는 로직
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        // 최상단 고정 컨테이너 (Framer Motion으로 애니메이션 추가 추천)
        <div className="fixed top-6 right-6 z-100 animate-fade-in-down">

            {/* 토스트 메인 바: 태블로 슬레이트 톤과 화이트 조합 */}
            <div className="flex items-center gap-4 bg-white border-2 border-slate-100 rounded-lg p-4 pr-6 shadow-2xl shadow-slate-200/50 min-w-[320px] max-w-100">

                {/* 🔥 Boxicons 성공 아이콘 컨테이너: 원형 배지 스타일 */}
                <div className="shrink-0 w-12 h-12 rounded-full bg-green-50 flex items-center justify-center border-4 border-white shadow-inner">
                    {/* Boxicons: bx-check-circle (성공의 상징) */}
                    <i className='bx bx-check-circle text-3xl text-green-500 animate-scale-in'></i>
                </div>

                {/* 텍스트 영역: 타이포그래피 위계 적용 */}
                <div className="flex-1 flex flex-col gap-0.5">
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">System Status</span>
                    <p className="text-[14px] font-bold text-slate-900 tracking-tight leading-snug">
                        {message as string}
                    </p>
                </div>

                {/* 닫기 버튼 (선택사항) */}
                <button
                    onClick={() => setIsVisible(false)}
                    className="text-slate-300 hover:text-slate-500 transition-colors ml-2"
                >
                    <i className='bx bx-x text-xl'></i>
                </button>
            </div>

            {/* 하단 진행 바 (자동 사라짐 시각화) */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-50/50 overflow-hidden rounded-b-lg">
                {/* 실제 움직이는 바 */}
                <motion.div
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{
                        duration: 2,
                        ease: "linear"
                    }}
                    className="h-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                    style={{ originX: 0 }}
                />
            </div>
        </div>
    );
}