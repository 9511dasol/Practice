const TrendBadge = ({ val }: { val: string }) => {
  if (!val || ["—", "미입력", "신규"].includes(val)) {
    return <span className="text-slate-400">—</span>;
  }
  const isDown = val.includes("▼");
  return (
    <div className={`flex items-center justify-end gap-1 font-bold tabular-nums ${isDown ? "text-emerald-500" : "text-rose-500"}`}>
      <i className={`bx ${isDown ? 'bx-trending-down' : 'bx-trending-up'} text-xs`}></i>
      <span>{val}</span>
    </div>
  );
};

export default TrendBadge;  