import clsx from "clsx";
import { RiskLevel } from "@/types/animal";

interface StatusBadgeProps {
  level: RiskLevel;
}

const levelLabelMap: Record<RiskLevel, string> = {
  normal: "НОРМА",
  attention: "ВНИМАНИЕ",
  risk: "РИСК",
};

export default function StatusBadge({ level }: StatusBadgeProps) {
  return (
    <span
      className={clsx(
        "rounded-full border px-2.5 py-1 text-xs font-semibold",
        level === "risk" && "border-red-200 bg-red-100 text-red-700",
        level === "attention" && "border-orange-200 bg-orange-100 text-orange-700",
        level === "normal" && "border-green-200 bg-green-100 text-green-700",
      )}
    >
      {levelLabelMap[level]}
    </span>
  );
}
