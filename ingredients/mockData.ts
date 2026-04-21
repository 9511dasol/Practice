import { ActionItem } from "./interface";

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

export const ACTION_DATA: ActionItem[] = [
    // --- 기존 데이터 ---
    { id: '1', status: '긴급', factory: '인도네시아 2공장', buyer: 'Buyer A', content: 'ISO 9001 인증 갱신 서류 제출', deadline: 'D-12', assignee: '김○○', source: '인증 만기' },
    { id: '2', status: '긴급', factory: '인도네시아 2공장', buyer: 'Buyer A', content: '재감사 일정 협의 및 준비 현황 보고', deadline: 'D-15', assignee: '이○○', source: '감사 재요청' },
    { id: '3', status: '주의', factory: '베트남 1공장', buyer: 'Buyer C', content: 'ESG 에너지 사용량 Q1 데이터 입력', deadline: 'D-18', assignee: '이○○', source: 'ESG 미입력' },
    { id: '4', status: '주의', factory: '중국 협력공장', buyer: 'Buyer C', content: '바이어 C 감사 준비 자료 제출', deadline: 'D-25', assignee: '박○○', source: '감사 Gap' },
    { id: '5', status: '진행중', factory: '중국 협력공장', buyer: 'Buyer C', content: '에너지 사용 초과 개선계획 수립', deadline: 'D-40', assignee: '최○○', source: 'ESG 초과' },
    { id: '6', status: '진행중', factory: '인도 3공장', buyer: 'Buyer A', content: 'HIGG FEM 자가 평가 완료 및 제출', deadline: 'D-45', assignee: '정○○', source: '요건 Gap' },
    { id: '7', status: '완료', factory: '방글라데시 공장', buyer: 'Buyer B', content: 'WRAP 인증 갱신 완료 확인', deadline: '완료', assignee: '김○○', source: '인증 갱신' },

    // --- 추가된 목업 데이터 (ESG / 환경 / 안전 / HR / 컴플라이언스 믹스) ---

    // [긴급] 즉시 조치 필요 건
    { id: '8', status: '긴급', factory: '태국 1공장', buyer: 'Buyer D', content: '비상구 적재물 철거 및 소방 설비 재점검', deadline: 'D-3', assignee: '강○○', source: '현장 불시점검' },
    { id: '9', status: '긴급', factory: '방글라데시 공장', buyer: 'Buyer A', content: '미성년자 노동 방지 서약서 전체 갱신', deadline: 'D-5', assignee: '윤○○', source: '규정 위반 경고' },
    { id: '10', status: '긴급', factory: '베트남 1공장', buyer: 'Buyer B', content: '폐수 처리 시설 B동 가동 중단 원인 보고', deadline: 'D-7', assignee: '최○○', source: '환경 실사 지적' },
    { id: '11', status: '긴급', factory: '인도네시아 2공장', buyer: 'Buyer C', content: '외국인 근로자 여권 압수 관행 시정 조치', deadline: 'D-10', assignee: '김○○', source: '인권 실사 Gap' },

    // [주의] 기한 임박 건
    { id: '12', status: '주의', factory: '중국 협력공장', buyer: 'Buyer B', content: '초과 근무 수당 미지급 건 소명 자료 제출', deadline: 'D-14', assignee: '박○○', source: '급여 대장 감사' },
    { id: '13', status: '주의', factory: '한국 본사', buyer: '내부 관리', content: '2026년 상반기 온실가스 인벤토리 검증', deadline: 'D-20', assignee: '이○○', source: '정기 평가' },
    { id: '14', status: '주의', factory: '인도 3공장', buyer: 'Buyer A', content: '안전보건관리책임자 선임계 관할청 제출', deadline: 'D-22', assignee: '정○○', source: '법규 변경' },
    { id: '15', status: '주의', factory: '베트남 1공장', buyer: 'Buyer D', content: '화학물질 MSDS(물질안전보건자료) 현장 비치', deadline: 'D-28', assignee: '송○○', source: '안전 보건 Gap' },
    { id: '16', status: '주의', factory: '태국 1공장', buyer: 'Buyer C', content: '근로자 고충 처리 위원회 1분기 회의록 등록', deadline: 'D-30', assignee: '조○○', source: 'HR 실사' },

    // [진행중] 담당자 배정 후 처리 중인 건
    { id: '17', status: '진행중', factory: '방글라데시 공장', buyer: 'Buyer A', content: '기숙사 소화기 추가 배치 및 대피 훈련 실시', deadline: 'D-35', assignee: '한○○', source: '안전 시설 부족' },
    { id: '18', status: '진행중', factory: '중국 협력공장', buyer: 'Buyer B', content: '재생에너지(태양광) 패널 설치 1차 벤더 미팅', deadline: 'D-42', assignee: '임○○', source: '탄소 저감 목표' },
    { id: '19', status: '진행중', factory: '인도네시아 2공장', buyer: 'Buyer A', content: 'RSL(제한물질목록) 테스트 결과서 취합', deadline: 'D-50', assignee: '권○○', source: '품질/환경 규제' },
    { id: '20', status: '진행중', factory: '한국 본사', buyer: '내부 관리', content: '전사 임직원 ESG 인식 제고 온라인 교육', deadline: 'D-60', assignee: '김○○', source: '연간 KPI' },
    { id: '21', status: '진행중', factory: '인도 3공장', buyer: 'Buyer D', content: '현지 노동법 개정에 따른 취업규칙 개정안 검토', deadline: 'D-65', assignee: '정○○', source: '법무 검토' },
    { id: '22', status: '진행중', factory: '태국 1공장', buyer: 'Buyer C', content: '생산 라인 LED 조명 교체 작업 (에너지 절감)', deadline: 'D-80', assignee: '강○○', source: '에너지 효율 Gap' },

    // [완료] 최근 조치 완료된 건
    { id: '23', status: '완료', factory: '베트남 1공장', buyer: 'Buyer B', content: '여성 근로자 휴게실 확충 공사 완료', deadline: '완료', assignee: '송○○', source: '복리후생 지적' },
    { id: '24', status: '완료', factory: '인도네시아 2공장', buyer: 'Buyer A', content: 'ZDHC 폐수 테스트 1분기 리포트 업로드', deadline: '완료', assignee: '권○○', source: '정기 보고' },
    { id: '25', status: '완료', factory: '방글라데시 공장', buyer: 'Buyer C', content: '구급함 비품 전면 교체 및 관리 대장 작성', deadline: '완료', assignee: '한○○', source: '현장 실사' },
    { id: '26', status: '완료', factory: '중국 협력공장', buyer: 'Buyer A', content: '신규 입사자 안전 교육 이수증 스캔본 제출', deadline: '완료', assignee: '임○○', source: '서류 누락 Gap' },
    { id: '27', status: '완료', factory: '한국 본사', buyer: '내부 관리', content: '2025년 지속가능경영보고서 영문본 배포', deadline: '완료', assignee: '이○○', source: '경영 공시' },
    { id: '28', status: '완료', factory: '인도 3공장', buyer: 'Buyer B', content: '지게차 운전자 자격증 사본 일제 점검', deadline: '완료', assignee: '정○○', source: '안전 감사' },
    { id: '29', status: '완료', factory: '태국 1공장', buyer: 'Buyer D', content: '협력업체 윤리 행동 강령(CoC) 서명 취합', deadline: '완료', assignee: '조○○', source: '공급망 실사' },
    { id: '30', status: '완료', factory: '베트남 1공장', buyer: 'Buyer C', content: '공조 설비 필터 교체 및 실내 공기질 측정', deadline: '완료', assignee: '최○○', source: '작업 환경 개선' },
];