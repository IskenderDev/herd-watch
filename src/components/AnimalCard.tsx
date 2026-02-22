import clsx from "clsx";
import { Activity, AlertCircle, TrendingDown, Users, UtensilsCrossed } from "lucide-react";
import { Alert } from "@/types/animal";
import StatusBadge from "./StatusBadge";

interface AnimalCardProps {
  alert: Alert;
  onClick: () => void;
}

function getReasonIcon(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes("ест")) return UtensilsCrossed;
  if (normalized.includes("отдел")) return Users;
  if (normalized.includes("нестабил") || normalized.includes("нетипич")) return AlertCircle;
  if (normalized.includes("сниж") || normalized.includes("пад")) return Activity;

  return TrendingDown;
}

export default function AnimalCard({ alert, onClick }: AnimalCardProps) {
  const ReasonIcon = getReasonIcon(alert.message);
  const isRisk = alert.riskLevel === "risk";

  return (
    <button
      onClick={onClick}
      className={clsx(
        "w-full rounded-2xl border-l-4 px-4 py-3 text-left shadow-sm transition-all duration-200 md:hover:scale-[1.01]",
        isRisk
          ? "border-red-500 bg-red-50 text-red-700"
          : "border-orange-500 bg-orange-50 text-orange-700",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-base font-bold text-foreground">№{alert.id}</p>
        <StatusBadge level={alert.riskLevel} />
      </div>
      <div className="mt-2 flex items-center text-sm text-muted-foreground">
        <ReasonIcon size={18} className="mr-2 text-gray-500" />
        <span>{alert.message}</span>
      </div>
    </button>
  );
}
