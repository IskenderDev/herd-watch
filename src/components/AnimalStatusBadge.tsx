import { RiskLevel } from "@/types/animal";

const config = {
  normal: { emoji: "🟢", label: "Норма", className: "bg-normal text-normal-foreground" },
  attention: { emoji: "🟡", label: "Внимание", className: "bg-attention text-attention-foreground" },
  risk: { emoji: "🔴", label: "Риск", className: "bg-risk text-risk-foreground animate-pulse-soft" },
};

export default function AnimalStatusBadge({ level }: { level: RiskLevel }) {
  const { emoji, label, className } = config[level];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${className}`}>
      {emoji} {label}
    </span>
  );
}
