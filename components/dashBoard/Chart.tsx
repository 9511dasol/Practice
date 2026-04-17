
import { groupedData } from '@/ingredients/interface';
import { GROUP_CONFIG } from '@/ingredients/object';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'



const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-[#2D3436] text-white p-3 rounded shadow-2xl border border-white/10 text-[12px] z-50">
                <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: data.color }} />
                    <span className="font-bold oty-90">{data.label}</span>
                </div>
                <div className="text-[14px] font-black">
                    {data.value}건 <span className="text-blue-300 ml-1">({data.percentage}%)</span>
                </div>
            </div>
        );
    }
    return null;
};

export default function Chart({ groupedData, len }: { groupedData: groupedData[], len: number }) {
    return (
        <div className="order-1 lg:order-2 flex-1 bg-white border-2 border-slate-100 rounded-lg p-6 shadow-sm flex flex-col items-center justify-between min-h-85">
            <div className="w-full text-center border-b border-slate-50 pb-3 mb-2">
                <h4 className="text-sm font-black text-[#1A252F] tracking-tight">리스크 분포 비율</h4>
            </div>
            <div className="w-full h-50 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={groupedData.filter(g => g.value > 0)}
                            innerRadius={65}
                            outerRadius={85}
                            dataKey="value"
                            stroke="none"
                            paddingAngle={3}
                            cornerRadius={4}
                        >
                            {groupedData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} wrapperStyle={{ zIndex: 100 }} />
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">전체 데이터</span>
                    <span className="text-2xl font-black text-[#4E79A7] leading-none mt-1">{len}</span>
                </div>
            </div>
            <div className="w-full grid grid-cols-4 gap-x-1 gap-y-3 mt-4 pt-4 border-t border-slate-50">
                {GROUP_CONFIG.map(g => (
                    <div key={g.id} className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full mb-1" style={{ backgroundColor: g.color }} />
                        <span className="text-[9px] font-bold text-slate-400 whitespace-nowrap tracking-tighter">{g.label.split(' ')[0]}</span>
                    </div>
                ))}
                <div className="flex items-center justify-center opacity-10"><i className='bx bx-check-circle text-xs' /></div>
            </div>
        </div>
    )
}
