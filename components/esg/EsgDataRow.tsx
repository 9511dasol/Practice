import { ChangeSpan } from "./ChangeSpan";

const cellClass = "border-b border-slate-100 px-3 py-2.5 text-center text-[11px]";

export const EsgDataRow = ({
    label,
    unit,
    cells,
    isAlt
}: {
    label: string;
    unit?: string;
    cells?: string[];
    isAlt?: boolean
}) => {
    const rowBg = isAlt ? "bg-slate-50/50" : "bg-white";

    return (
        <tr className={`${rowBg} hover:bg-slate-100/50 transition-colors`}>
            <td className="sticky left-0 z-10 border-b border-r border-slate-100 bg-inherit px-3 py-2.5 font-semibold text-slate-700">
                <div className="flex flex-col">
                    <span>{label}</span>
                    {unit && <span className="text-[9px] font-normal text-slate-400">{unit}</span>}
                </div>
            </td>
            {cells ? (
                <>
                    <td className={`${cellClass} bg-blue-50/30`}>{cells[0]}</td>
                    <td className={`${cellClass} bg-blue-50/30 border-r border-slate-100`}>{cells[1]}</td>
                    <td className={`${cellClass} bg-emerald-50/30`}>{cells[2]}</td>
                    <td className={`${cellClass} bg-emerald-50/30 border-r border-slate-100`}>{cells[3]}</td>
                    <td className={cellClass}>{cells[4]}</td>
                    <td className={`${cellClass} border-r border-slate-100`}>{cells[5]}</td>
                    <td className={cellClass}><ChangeSpan val={cells[6]} /></td>
                    <td className={cellClass}><ChangeSpan val={cells[7]} /></td>
                </>
            ) : (
                <td colSpan={8} className={`${cellClass} text-slate-300 tracking-widest`}>데이터 없음</td>
            )}
        </tr>
    );
};