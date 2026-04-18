const StatusBadge = ({ val }: { val: string }) => {
  if (!val || ["—", "미입력", "신규"].includes(val)) {
    return (
      <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500 ring-1 ring-inset ring-slate-200">
        <i className="bx bx-minus text-xs"></i>
        {val || "—"}
      </span>
    );
  }
  const isDown = val.startsWith("▼");
  const baseClass =
    "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold ring-1 ring-inset tabular-nums";
  const colors = isDown
    ? "bg-emerald-50 text-emerald-700 ring-emerald-200" // 감소 (성공)
    : "bg-rose-50 text-rose-700 ring-rose-200"; // 증가 (위험)

  return (
    <span className={`${baseClass} ${colors}`}>
      <i
        className={`bx ${isDown ? "bx-trending-down" : "bx-trending-up"} text-xs`}
      ></i>
      {val}
    </span>
  );
};

export default StatusBadge;
