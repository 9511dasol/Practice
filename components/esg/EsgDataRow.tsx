import { ChangeSpan } from "./ChangeSpan";

const cellClass =
  "border-b border-slate-100 px-4 py-5 text-center text-xs font-medium";

export const EsgDataRow = ({
  iconClass,
  label,
  unit,
  cells,
  isAlt,
}: {
  iconClass: string;
  label: string;
  unit?: string;
  cells?: string[];
  isAlt?: boolean;
}) => {
  const rowBg = isAlt ? "bg-slate-50/40" : "bg-white";

  return (
    <tr className={`${rowBg} hover:bg-slate-50 transition-colors group`}>
      <td className="sticky left-0 z-10 border-b border-r border-slate-100 bg-inherit px-5 py-1 font-semibold text-slate-700">
        <div className="flex items-center gap-4">
          {/* Boxicons 아이콘 컨테이너 */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
            <i className={`bx ${iconClass} text-xl`}></i>
          </div>
          <div className="flex flex-col items-start gap-1.5">
            <span className="text-sm text-slate-800 leading-none">{label}</span>
            {unit && (
              <span className="inline-flex items-center rounded-md bg-slate-100/80 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-slate-500 ring-1 ring-inset ring-slate-200/80 group-hover:bg-white group-hover:text-blue-500 transition-colors">
                {unit}
              </span>
            )}
          </div>
        </div>
      </td>
      {cells ? (
        <>
          <td className={`${cellClass} text-slate-800 bg-blue-50/20`}>
            {cells[0]}
          </td>
          <td
            className={`${cellClass} text-slate-800 bg-blue-50/20 border-r border-slate-100`}
          >
            {cells[1]}
          </td>
          <td className={`${cellClass} text-slate-800 bg-emerald-50/20`}>
            {cells[2]}
          </td>
          <td
            className={`${cellClass} text-slate-800 bg-emerald-50/20 border-r border-slate-100`}
          >
            {cells[3]}
          </td>
          <td className={`${cellClass} text-slate-800`}>{cells[4]}</td>
          <td
            className={`${cellClass} text-slate-800 border-r border-slate-100`}
          >
            {cells[5]}
          </td>
          <td className={`${cellClass} text-slate-800`}>
            <ChangeSpan val={cells[6]} />
          </td>
          <td className={`${cellClass} text-slate-800`}>
            <ChangeSpan val={cells[7]} />
          </td>
        </>
      ) : (
        <td
          colSpan={8}
          className={`${cellClass} text-slate-400 tracking-widest bg-slate-50/20`}
        >
          데이터 없음
        </td>
      )}
    </tr>
  );
};
