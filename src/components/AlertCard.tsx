import { Alert } from "@/types/animal";

interface AlertCardProps {
  alert: Alert;
  onClick: () => void;
}

export default function AlertCard({ alert, onClick }: AlertCardProps) {
  const icon = alert.riskLevel === "risk" ? "🔴" : "🟡";
  const borderColor =
    alert.riskLevel === "risk"
      ? "border-l-risk"
      : "border-l-attention";

  return (
    <button
      onClick={onClick}
      className={`w-full text-left bg-card rounded-xl shadow-md p-4 border-l-4 ${borderColor} flex items-center gap-3 min-h-[56px] active:scale-[0.98] transition-transform`}
    >
      <span className="text-2xl flex-shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-foreground">№{alert.id}</div>
        <div className="text-sm text-muted-foreground truncate">
          {alert.message}
        </div>
      </div>
      <span className="text-muted-foreground text-lg">›</span>
    </button>
  );
}
