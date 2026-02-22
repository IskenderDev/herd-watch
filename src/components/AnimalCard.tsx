import clsx from "clsx";
import { Activity, AlertCircle, TrendingDown, Users, Utensils } from "lucide-react";
import { Alert } from "@/types/animal";
import StatusBadge from "./StatusBadge";

interface AnimalCardProps {
  alert: Alert;
  onClick: () => void;
}

function getReasonIcon(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes("ест")) return Utensils;
  if (normalized.includes("отдел")) return Users;
  if (normalized.includes("нестабил")) return AlertCircle;
  if (normalized.includes("сниж") || normalized.includes("пад")) return TrendingDown;

  return Activity;
}

export default function AnimalCard({ alert, onClick }: AnimalCardProps) {
  const ReasonIcon = getReasonIcon(alert.message);

  return (
    <button
      onClick={onClick}
      className={clsx(
        "w-full rounded-2xl border bg-card px-4 py-3 text-left shadow-sm",
        "transition-all duration-200 hover:scale-[1.02]",
        alert.riskLevel === "risk" ? "border-l-4 border-l-red-700" : "border-l-4 border-l-orange-600",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-base font-bold text-foreground">№{alert.id}</p>
        <StatusBadge level={alert.riskLevel} />
      </div>
      <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
        <ReasonIcon size={18} className="text-gray-500" />
        <span>{alert.message}</span>
      </div>
    </button>
  );
}
