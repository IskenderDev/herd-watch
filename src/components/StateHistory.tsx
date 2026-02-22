import { AnimalHistoryEntry } from "@/types/animal";
import AnalyticsLineChart from "@/components/AnalyticsLineChart";

export default function StateHistory({ history }: { history: AnimalHistoryEntry[] }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">Аналитика активности</h3>
      <AnalyticsLineChart history={history} />
    </div>
  );
}
