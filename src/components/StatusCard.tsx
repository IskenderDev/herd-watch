import clsx from "clsx";
import { AlertTriangle, CheckCircle2, Flame } from "lucide-react";

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
      icon: CheckCircle2,
      base: "bg-green-50 text-green-700",
      active: "bg-green-700 text-white ring-green-200",
    },
    warning: {
      icon: AlertTriangle,
      base: "bg-orange-50 text-orange-700",
      active: "bg-orange-600 text-white ring-orange-200",
    },
    risk: {
      icon: Flame,
      base: "bg-red-50 text-red-700",
      active: "bg-red-700 text-white ring-red-200",
    },
  };

  const Icon = styles[filterValue].icon;

  return (
    <button
      onClick={onClick}
      className={clsx(
        "cursor-pointer rounded-2xl p-4 text-left shadow-sm transition-all duration-200 md:hover:scale-[1.01]",
        isActive ? styles[filterValue].active : styles[filterValue].base,
        isActive ? "ring-2 ring-offset-2" : "ring-1 ring-transparent",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="text-3xl font-extrabold leading-none">{count}</div>
        <Icon size={18} className={clsx("opacity-80", isActive && "opacity-100")} />
      </div>
      <div className="mt-2 text-xs font-semibold uppercase tracking-wide">{label}</div>
    </button>
  );
}
