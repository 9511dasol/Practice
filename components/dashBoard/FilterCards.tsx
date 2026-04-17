"use client";
import { groupedData } from '@/ingredients/interface';
import { Dispatch, SetStateAction } from 'react'
interface Props {
    groupedData: groupedData[]; // 인터페이스 이름은 관례상 대문자로 시작하는 게 좋아요!
    selectedGroupIds: string[];
    setSelectedGroupIds: Dispatch<SetStateAction<string[]>>;
}
//   const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);

export default function FilterCards({ groupedData, selectedGroupIds, setSelectedGroupIds }: Props) {
    return (
        <div className="order-2 lg:order-1 flex-[1.8] grid grid-cols-2 sm:grid-cols-4 gap-3">
            {groupedData.map((group) => {
                const isSelected = selectedGroupIds.includes(group.id);
                const originalBg = group.bgColor;
                const bgColor: string = originalBg === "bg-blue-50" ? "bg-blue-100" : originalBg === "bg-gray-50" ? "bg-gray-200" : originalBg;
                // let bgColor: string | null = group.bgColor === "bg-blue-50" ? "bg-blue-200" : group.bgColor;
                return (
                    <div
                        key={group.id}
                        onClick={() => setSelectedGroupIds(prev => prev.includes(group.id) ? prev.filter(id => id !== group.id) : [...prev, group.id])}
                        className={`
                        cursor-pointer p-4 rounded-md border-2 transition-all flex flex-col justify-between min-h-27.5
                        ${isSelected
                                ? `
                            ${bgColor} ${group.border} scale-[1.02] z-10 
                            shadow-[0_10px_15px_-3px_rgba(0,0,0,0.04)] 
                            before:absolute before:top-0 before:left-0 before:w-1 before:h-full ${group.border}
                            relative overflow-hidden
        `
                                : 'bg-white border-slate-100 hover:border-slate-300 shadow-sm opacity-80 hover:opacity-100'
                            }`}>
                        <div className="flex items-start justify-between">
                            <div className="flex flex-col gap-1">
                                <span className="text-[11px] font-black text-slate-500">{group.label}</span>
                                <div className={isSelected ? "w-10 h-1 rounded-full" : "w-6 h-1 rounded-full"} style={{ backgroundColor: group.color }} />
                            </div>
                            <span className={isSelected ? "text-[10px] font-bold text-slate-700 italic" : "text-[10px] font-bold text-slate-300 italic"}>{group.percentage}%</span>
                        </div>
                        <div className="mt-4 flex items-baseline gap-1">
                            <span className="text-3xl font-black tracking-tighter leading-none">{group.value}</span>
                            <span className="text-xs font-bold text-slate-400 uppercase">건</span>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}
