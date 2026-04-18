interface EsgTabNavProps {
    currentTab: string;
    tabs: string[];
    labels: Record<string, string>;
    onTabChange: (key: any) => void;
}

export const EsgTabNav = ({ currentTab, tabs, labels, onTabChange }: EsgTabNavProps) => (
    <div className="mb-4 flex flex-wrap gap-2">
        {tabs.map((key) => (
            <button
                key={key}
                onClick={() => onTabChange(key)}
                className={`rounded-full border px-4 py-1.5 text-xs transition-all ${currentTab === key
                    ? "bg-slate-800 font-bold text-white border-slate-800"
                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                    }`}
            >
                {labels[key as string]}
            </button>
        ))}
    </div>
);