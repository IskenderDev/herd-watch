import { AnimalHistoryEntry } from "@/types/animal";

const statusEmoji = { normal: "🟢", attention: "🟡", risk: "🔴" };

export default function StateHistory({ history }: { history: AnimalHistoryEntry[] }) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-foreground">История (7 дней)</h3>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {history.map((entry, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-1 min-w-[44px] bg-card rounded-xl p-2 shadow-sm border border-border"
          >
            <span className="text-lg">{statusEmoji[entry.status]}</span>
            <span className="text-[10px] text-muted-foreground font-medium">{entry.dayLabel}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
