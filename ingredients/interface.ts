export interface Item {
    id: number;
    title: string;
    content: string;
};

export interface PageProps {
    params: Promise<{ id: string }>;  // Promise 타입 명시
}

export interface tempInpo {
    id: number;
    company: string;
    project: string;
    start: string; // ISO 8601 형식 (예: "2026-02-18T09:00")
    end: string;
    desc: string;
}

export interface Project {
    auditType: string;
    buyer: string;
    co: string;
    dueBucket: string;
    dueDays: number;
    dueSoon: any;
    expiryDate: string;
    factoryName: string;
    fctId: string;
    id: number;
    latestAuditDate: string;
}

export interface fetchData {
    items: Project[];
    totalCount: number;
    totalPages: number;
}

export interface execelSendResult {
    failed: number;
    inserted: number;
    skipped: number;
    updated: number;
}


export interface groupedData {
    value: number;
    items: Project[];
    percentage: number;
    id: string;
    label: string;
    range: number[] | null[];
    color: string;
    bgColor: string;
    textColor: string;
    border: string;
}

export interface DetailedProject {
    id: number;
    buyer: string;
    co: string;
    factoryName: string;
    fctId: string;
    tCode: string | null;            // 현재 null이지만 문자열이 들어올 가능성 대비
    auditType: string;
    latestAuditor: string | null;    // 현재 null이지만 감사자 이름이 들어올 수 있음
    latestAuditDate: string;         // ISO 날짜 문자열 ("YYYY-MM-DD")
    expiryDate: string;              // ISO 날짜 문자열 ("YYYY-MM-DD")
    statusText: string | null;
    remarks: string | null;
    dueBucket: 'OVER' | 'SOON' | 'NORMAL' | string; // 리스크 그룹 구분을 위한 유니온 타입
    dueDays: number;
    dueSoon: boolean;
    factoryKey: string;
    rowSeq: number;
    updatedAt: string;               // ISO 8601 날짜 시간 문자열
}

export interface Requirement {
    reqId: string;            // 요구사항 고유 ID
    category: 'E' | 'S' | 'G'; // ESG 분류
    itemName: string;         // 항목명 (예: Higg FEM, ISO 14001)
    criteriaType: 'status' | 'date' | 'boolean'; // 판별 방식 (상태값 비교 / 날짜 확인 / 유무)
    minStatus?: string;       // 최소 요구 상태 (예: 'Verified', 'Level 1')
    validPeriodMonths?: number; // 갱신 주기 (예: 12개월)
    importance: 'Critical' | 'High' | 'Medium'; // 위험도 산출용
    description: string;      // 바이어측 요구 상세 설명
}

export interface BuyerTemplate {
    templateId: string;
    buyerName: string;        // 바이어명 (또는 'Baseline' 표준 기준)
    version: string;          // 템플릿 버전 (규정 변경 대응)
    isBaseline: boolean;      // 표준 기준 여부
    requirements: Requirement[];
}