"use client";
import { ActionItem, ActionStatus } from "@/ingredients/interface";
import ActionStatusBadge from "./ActionStatusBadge";
import React, { useState, useEffect, useRef, useCallback, use } from 'react';

const getRowBg = (status: ActionStatus) => {
    if (status === '긴급') return 'bg-rose-50/40 hover:bg-rose-50';
    if (status === '주의') return 'bg-amber-50/30 hover:bg-amber-50/60';
    return 'bg-white hover:bg-slate-50';
};

const getDeadlineStyle = (status: ActionStatus) => {
    if (status === '긴급') return 'text-rose-600 font-bold';
    if (status === '주의') return 'text-amber-600 font-bold';
    if (status === '완료') return 'text-slate-400';
    return 'text-slate-700';
};
const ITEMS_PER_PAGE = 5;

const ActionTable = ({ data }: { data: ActionItem[] }) => {
    // State 관리
    const [displayedData, setDisplayedData] = useState<ActionItem[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // IntersectionObserver가 감시할 타겟 Ref
    const observerTarget = useRef<HTMLDivElement>(null);

    // 1. 초기 데이터 세팅
    useEffect(() => {
        setDisplayedData(data.slice(0, ITEMS_PER_PAGE));
        setPage(1);
        setHasMore(data.length > ITEMS_PER_PAGE);
    }, [data]);

    // 2. 추가 데이터 로드 함수 (가상의 API 호출 시뮬레이션)
    const loadMoreData = useCallback(() => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);

        // 실제 환경의 네트워크 지연시간(0.5초) 시뮬레이션
        setTimeout(() => {
            const nextStartIndex = page * ITEMS_PER_PAGE;
            const nextEndIndex = nextStartIndex + ITEMS_PER_PAGE;
            const nextData = data.slice(nextStartIndex, nextEndIndex);

            if (nextData.length > 0) {
                setDisplayedData((prev) => [...prev, ...nextData]);
                setPage((prev) => prev + 1);
            }

            // 더 이상 불러올 데이터가 없으면 hasMore를 false로 변경
            if (nextEndIndex >= data.length) {
                setHasMore(false);
            }

            setIsLoading(false);
        }, 500);
    }, [page, data, isLoading, hasMore]);

    // 3. IntersectionObserver 설정 (화면 맨 아래에 도달했는지 감지)
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // 타겟(맨 아래 요소)이 화면에 보이고, 더 불러올 데이터가 있다면 loadMoreData 실행
                if (entries[0].isIntersecting && hasMore) {
                    loadMoreData();
                }
            },
            { threshold: 0.1 } // 타겟이 10% 정도 보이면 트리거
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [loadMoreData, hasMore]);

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col">
            {/* 테이블 상단 헤더 정보 */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-5 py-3.5 shrink-0">
                <div className="flex items-center gap-2">
                    <i className="bx bx-list-ul text-lg text-slate-500"></i>
                    <span className="text-sm font-bold text-slate-800">전체 Action 목록</span>
                </div>
                <span className="text-[11px] font-medium text-slate-500">
                    총 {data.length}건 중 {displayedData.length}건 표시
                </span>
            </div>

            {/* 테이블 스크롤 영역 (max-h를 지정하여 이 내부에서만 스크롤되도록 설정) */}
            <div className="overflow-x-auto overflow-y-auto max-h-125 relative custom-scrollbar">
                <table className="w-full min-w-200 text-left text-[12px]">
                    {/* 스크롤 시에도 헤더가 상단에 고정되도록 sticky 적용 */}
                    <thead className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-500 shadow-[0_1px_2px_-1px_rgba(0,0,0,0.05)]">
                        <tr>
                            <th className="px-5 py-3 w-20 bg-slate-50">상태</th>
                            <th className="px-4 py-3 w-37.5 bg-slate-50">공장</th>
                            <th className="px-4 py-3 w-25 bg-slate-50">바이어</th>
                            <th className="px-4 py-3 bg-slate-50">Action 내용</th>
                            <th className="px-4 py-3 text-center w-25 bg-slate-50">기한</th>
                            <th className="px-4 py-3 w-22.5 bg-slate-50">담당자</th>
                            <th className="px-5 py-3 w-30 bg-slate-50">출처 (Gap)</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {displayedData.map((row) => (
                            <tr key={row.id} className={`${getRowBg(row.status)} transition-colors`}>
                                <td className="px-5 py-3"><ActionStatusBadge status={row.status} /></td>
                                <td className="px-4 py-3 font-bold text-slate-700">{row.factory}</td>
                                <td className="px-4 py-3">
                                    <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600 ring-1 ring-inset ring-slate-200/60">
                                        {row.buyer}
                                    </span>
                                </td>
                                <td className="px-4 py-3 font-medium text-slate-800">{row.content}</td>
                                <td className={`px-4 py-3 text-center ${getDeadlineStyle(row.status)}`}>{row.deadline}</td>
                                <td className="px-4 py-3 text-slate-600">{row.assignee}</td>
                                <td className="px-5 py-3 text-[11px] text-slate-500">{row.source}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* 인피니트 스크롤 감지 및 로딩 표시 영역 */}
                <div ref={observerTarget} className="h-14 flex items-center justify-center bg-white">
                    {isLoading && (
                        <div className="flex items-center gap-2 text-slate-400">
                            <i className="bx bx-loader-alt animate-spin text-lg"></i>
                            <span className="text-[11px] font-semibold tracking-wide">데이터를 불러오는 중...</span>
                        </div>
                    )}
                    {!hasMore && displayedData.length > 0 && (
                        <div className="text-[11px] font-medium text-slate-400 pb-2">
                            모든 데이터를 불러왔습니다.
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ActionTable;