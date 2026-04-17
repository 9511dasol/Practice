export const GROUP_CONFIG = [
    { id: 'expired', label: '기간 만료', range: [-Infinity, -1], color: '#FFC0CB', bgColor: 'bg-pink-50', textColor: 'text-[#FFC0CB]', border: 'border-pink-100' },
    { id: 'urgent', label: '30일 이내', range: [0, 30], color: '#E15759', bgColor: 'bg-red-50', textColor: 'text-[#E15759]', border: 'border-red-100' },
    { id: 'warning', label: '60일 이내', range: [31, 60], color: '#F28E2B', bgColor: 'bg-orange-50', textColor: 'text-[#F28E2B]', border: 'border-orange-100' },
    { id: 'safe', label: '90일 이내', range: [61, 90], color: '#59A14F', bgColor: 'bg-green-50', textColor: 'text-[#59A14F]', border: 'border-green-100' },
    { id: 'normal', label: '120일 이내', range: [91, 121], color: '#87CEEB', bgColor: 'bg-sky-50', textColor: 'text-[#87CEEB]', border: 'border-sky-100' },
    { id: 'extended', label: '120일 초과', range: [122, Infinity], color: '#0000FF', bgColor: 'bg-blue-50', textColor: 'text-[#0000FF]', border: 'border-blue-100' },
    { id: 'noDate', label: '미정', range: [null, null], color: '#BAB0AC', bgColor: 'bg-gray-50', textColor: 'text-[#767171]', border: 'border-gray-200' },
];