import { DetailedProject, Requirement, BuyerTemplate } from '@/ingredients/interface';

// 분석 결과 인터페이스
export interface GapResult {
    reqId: string;
    itemName: string;
    category: string;
    importance: string;
    currentStatus: string; // 공장의 현재 상태
    requiredStatus: string; // 바이어 요구 상태
    result: 'Compliant' | 'Non-Compliant' | 'Missing'; // 판정 결과
    message: string; // 상세 메시지
}

// 상태별 우선순위 (비교용)
const statusPriority: { [key: string]: number } = {
    'Verified': 3,
    'Completed': 2,
    'Self-Assessed': 1,
    'Valid': 2,
    'None': 0,
    'Level 1': 1,
    'Level 2': 2
};

export function calculateGap(
    factoryData: DetailedProject,
    template: BuyerTemplate
): GapResult[] {
    // 공장의 인증 데이터 (실제로는 별도 API로 가져와야 함, 여기선 예시용 가상 데이터 사용)
    const factoryCerts = [
        { itemName: 'Higg FEM', status: 'Self-Assessed', expiryDate: '2026-12-31' },
        { itemName: 'ISO 14001', status: 'Valid', expiryDate: '2027-01-01' },
    ];

    return template.requirements.map((req) => {
        // 1. 공장의 해당 인증 항목 찾기
        const matchingCert = factoryCerts.find(cert => cert.itemName === req.itemName);

        // 2. 문서가 없는 경우
        if (!matchingCert) {
            return {
                reqId: req.reqId,
                itemName: req.itemName,
                category: req.category,
                importance: req.importance,
                currentStatus: 'N/A',
                requiredStatus: req.minStatus || 'File Required',
                result: 'Missing',
                message: `${req.itemName} 문서가 등록되지 않았습니다.`
            };
        }

        // 3. 기준 타입에 따른 비교 로직
        if (req.criteriaType === 'status' && req.minStatus) {
            const currentPriority = statusPriority[matchingCert.status] || 0;
            const requiredPriority = statusPriority[req.minStatus] || 0;

            if (currentPriority >= requiredPriority) {
                return {
                    reqId: req.reqId,
                    itemName: req.itemName,
                    category: req.category,
                    importance: req.importance,
                    currentStatus: matchingCert.status,
                    requiredStatus: req.minStatus,
                    result: 'Compliant',
                    message: '요구되는 인증 상태를 충족합니다.'
                };
            } else {
                return {
                    reqId: req.reqId,
                    itemName: req.itemName,
                    category: req.category,
                    importance: req.importance,
                    currentStatus: matchingCert.status,
                    requiredStatus: req.minStatus,
                    result: 'Non-Compliant',
                    message: `요구 상태(${req.minStatus})보다 현재 상태(${matchingCert.status})가 낮습니다.`
                };
            }
        }

        // 4. 기본값 (비교 불가 등)
        return {
            reqId: req.reqId,
            itemName: req.itemName,
            category: req.category,
            importance: req.importance,
            currentStatus: matchingCert.status,
            requiredStatus: 'Unknown',
            result: 'Missing',
            message: '비교 로직을 적용할 수 없습니다.'
        };
    });
}