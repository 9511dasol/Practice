
// 공장 데이터의 핵심 규격
export interface Factory {
    id: number;                // 고유 ID (URL 파라미터용)
    fctId: string;             // 공장 식별 번호 (ID10918E0GPT)
    factoryName: string;       // 공장 이름
    country: string;           // 국가
    statusText: string;        // 운영 상태 (9th yr, Active 등)
    buyer: string;             // 주요 바이어
    manager: string;           // 담당자 이름
    auditor: string;           // 감사 기관 (Audited by)
    remarks: string;           // 비고 및 유효기간

    // 엑셀의 노란색 섹션: 수치 지표
    metrics: {
        danger: number;          // 위험
        dueSoon: number;         // 만기임박
        unmet: number;           // 미충족
        action: number;          // Action
        overdue: number;         // Overdue
    };

    // 하단 탭: 이동 경로 (외부 URL 또는 내부 경로)
    links: {
        auditUrl: string;        // 인증/Audit
        esgUrl: string;          // ESG
        buyerUrl: string;        // 바이어
        actionUrl: string;       // Action
        docUrl: string;          // 문서
    };

    category: 'E' | 'S' | 'G'; // ESG 카테고리
    dueBucket: 'OVER' | 'SOON' | 'NORMAL'; // 리스크 상태 분류
    updatedAt: string;         // 최근 업데이트 일자
}

export const mockProjects: Factory[] = [
    {
        id: 1,
        fctId: "ID10918E0GPT",
        factoryName: "PT. Bintang Baru Sukses",
        country: "Vietnam",
        statusText: "9th yr",
        buyer: "Better Work",
        manager: "Nick",
        auditor: "BW",
        remarks: "Valid until 2026-06-05",
        metrics: {
            danger: 3,
            dueSoon: 2,
            unmet: 1,
            action: 3,
            overdue: 2,
        },
        links: {
            auditUrl: "https://example.com/audit/1",
            esgUrl: "https://example.com/esg/1",
            buyerUrl: "https://example.com/buyer/1",
            actionUrl: "https://example.com/action/1",
            docUrl: "https://example.com/docs/1",
        },
        category: 'E',
        dueBucket: 'OVER',
        updatedAt: "2026-03-20",
    },
    {
        id: 2,
        fctId: "ID22045A0KOR",
        factoryName: "(주) 세삭 솔루션",
        country: "South Korea",
        statusText: "3rd yr",
        buyer: "Nike",
        manager: "한준서",
        auditor: "SGS",
        remarks: "Next audit scheduled for 2026-12",
        metrics: {
            danger: 0,
            dueSoon: 1,
            unmet: 0,
            action: 5,
            overdue: 0,
        },
        links: {
            auditUrl: "/stat/2/audit",
            esgUrl: "/stat/2/esg",
            buyerUrl: "/stat/2/buyer",
            actionUrl: "/stat/2/action",
            docUrl: "/stat/2/docs",
        },
        category: 'S',
        dueBucket: 'NORMAL',
        updatedAt: "2026-03-15",
    },
    {
        id: 3,
        fctId: "ID33099C0INA",
        factoryName: "Indo Garment Ltd.",
        country: "Indonesia",
        statusText: "12th yr",
        buyer: "Adidas",
        manager: "Juyeon",
        auditor: "Intertek",
        remarks: "CAP in progress",
        metrics: {
            danger: 1,
            dueSoon: 8,
            unmet: 4,
            action: 2,
            overdue: 5,
        },
        links: {
            auditUrl: "#",
            esgUrl: "#",
            buyerUrl: "#",
            actionUrl: "#",
            docUrl: "#",
        },
        category: 'G',
        dueBucket: 'SOON',
        updatedAt: "2026-03-19",
    }
];