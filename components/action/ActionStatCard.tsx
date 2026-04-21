const ActionStatCard = ({ title, value, subtitle, type }: { title: string, value: string, subtitle: string, type: 'danger' | 'warning' | 'info' | 'success' | 'default' }) => {
    const colorMap = {
        danger: { border: 'border-rose-200', text: 'text-rose-600', sub: 'text-rose-500', bg: 'bg-rose-50/30' },
        warning: { border: 'border-amber-200', text: 'text-amber-600', sub: 'text-amber-500', bg: 'bg-amber-50/30' },
        info: { border: 'border-blue-200', text: 'text-blue-600', sub: 'text-slate-500', bg: 'bg-blue-50/30' },
        success: { border: 'border-emerald-200', text: 'text-emerald-600', sub: 'text-emerald-500', bg: 'bg-emerald-50/30' },
        default: { border: 'border-slate-200', text: 'text-slate-800', sub: 'text-slate-400', bg: 'bg-white' },
    };
    const c = colorMap[type];

    return (
        <div className={`flex flex-col justify-center rounded-xl border ${c.border} ${c.bg} px-4 py-3.5 shadow-sm transition-transform hover:-translate-y-0.5`}>
            <div className="mb-1 text-[11px] font-semibold text-slate-500">{title}</div>
            <div className={`text-2xl leading-none font-black tracking-tight ${c.text}`}>{value}</div>
            <div className={`mt-1 text-[10px] font-bold ${c.sub}`}>{subtitle}</div>
        </div>
    );
};
export default ActionStatCard;