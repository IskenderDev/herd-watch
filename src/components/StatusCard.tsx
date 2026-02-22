import clsx from "clsx";
import { AlertTriangle, CheckCircle, Flame } from "lucide-react";

export type DashboardFilter = "all" | "normal" | "warning" | "risk";

interface StatusCardProps {
  count: number;
  label: string;
  filterValue: Exclude<DashboardFilter, "all">;
  isActive: boolean;
  onClick: () => void;
}

export default function StatusCard({ count, label, filterValue, isActive, onClick }: StatusCardProps) {
  const styles = {
    normal: {
      icon: CheckCircle,
      card: "bg-green-50 text-green-700",
      ring: "ring-green-200",
    },
    warning: {
      icon: AlertTriangle,
      card: "bg-orange-50 text-orange-600",
      ring: "ring-orange-200",
    },
    risk: {
      icon: Flame,
      card: "bg-red-50 text-red-700",
      ring: "ring-red-200",
    },
  };

  const Icon = styles[filterValue].icon;

  return (
    <button
      onClick={onClick}
      className={clsx(
        "rounded-2xl p-4 text-left shadow-sm transition-all duration-200 hover:scale-[1.02] cursor-pointer",
        styles[filterValue].card,
        isActive ? `ring-2 ${styles[filterValue].ring}` : "ring-1 ring-transparent",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="text-3xl font-extrabold leading-none">{count}</div>
        <Icon size={18} className="opacity-80" />
      </div>
      <div className="mt-2 text-xs font-semibold uppercase tracking-wide opacity-90">{label}</div>
    </button>
  );
}
