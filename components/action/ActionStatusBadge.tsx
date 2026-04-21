import { ActionStatus } from "@/ingredients/interface";

const ActionStatusBadge = ({ status }: { status: ActionStatus }) => {
    const styles = {
        '긴급': 'bg-rose-100 text-rose-700 ring-rose-200',
        '주의': 'bg-amber-100 text-amber-700 ring-amber-200',
        '진행중': 'bg-blue-100 text-blue-700 ring-blue-200',
        '완료': 'bg-emerald-100 text-emerald-700 ring-emerald-200',
    };
    return (
        <span className={`inline-flex items-center whitespace-nowrap rounded-md px-2 py-0.5 text-[10px] font-bold ring-1 ring-inset ${styles[status]}`}>
            {status}
        </span>
    );
};

export default ActionStatusBadge;