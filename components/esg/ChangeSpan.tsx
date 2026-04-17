export const ChangeSpan = ({ val }: { val: string }) => {
    if (!val || ["—", "미입력", "신규"].includes(val)) {
        return <span className="text-slate-400">{val || "—"}</span>;
    }
    const isDown = val.startsWith("▼");
    return (
        <span className={`font-bold ${isDown ? "text-emerald-600" : "text-rose-600"}`}>
            {val}
        </span>
    );
};