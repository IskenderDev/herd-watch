import { useState } from "react";
import HerdStatusSummary from "@/components/HerdStatusSummary";
import AlertsList from "@/components/AlertsList";
import { useAnimalsContext } from "@/context/AnimalsContext";
import { DashboardFilter } from "@/components/StatusCard";

export default function DashboardPage() {
  const { summary, alerts } = useAnimalsContext();
  const [filter, setFilter] = useState<DashboardFilter>("all");

  return (
    <div className="space-y-4">
      {summary.risk > 0 && (
        <div className="sticky top-[68px] z-40 rounded-2xl border border-red-200 bg-red-100 px-4 py-3 text-sm font-medium text-red-800">
          ⚠ {summary.risk} животных в зоне риска
        </div>
      )}

      <HerdStatusSummary
        normal={summary.normal}
        attention={summary.attention}
        risk={summary.risk}
        activeFilter={filter}
        onFilterChange={setFilter}
      />
      <AlertsList alerts={alerts} filter={filter} />
    </div>
  );
}
