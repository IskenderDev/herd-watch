import { useMemo, useState } from "react";
import { Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HerdStatusSummary from "@/components/HerdStatusSummary";
import AlertsList from "@/components/AlertsList";
import NormalAnimalsSection from "@/components/NormalAnimalsSection";
import { useAnimalsContext } from "@/context/AnimalsContext";
import { DashboardFilter } from "@/components/StatusCard";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { summary, alerts, animals } = useAnimalsContext();
  const [filter, setFilter] = useState<DashboardFilter>("all");

  const herdSummaryText = useMemo(() => {
    const topProblems = alerts.slice(0, 3).map((alert) => alert.message).join(", ");
    return `Всего ${summary.normal + summary.attention + summary.risk} животных. В норме ${summary.normal}, во внимании ${summary.attention}, в риске ${summary.risk}. Ключевые проблемы: ${topProblems || "нет"}.`;
  }, [alerts, summary]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <button
          onClick={() =>
            navigate("/ai-assistant", {
              state: {
                contextType: "herd",
                herdSummary: herdSummaryText,
                herdStats: {
                  total: summary.normal + summary.attention + summary.risk,
                  normal: summary.normal,
                  attention: summary.attention,
                  risk: summary.risk,
                },
              },
            })
          }
          className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground"
        >
          <Bot className="h-4 w-4" /> ИИ-ассистент
        </button>
      </div>

      {summary.risk > 0 && (
        <div className="sticky top-[68px] z-40 rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-800 transition-all duration-200">
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

      <NormalAnimalsSection
        animals={animals}
        summaryNormalCount={summary.normal}
        filter={filter}
      />
    </div>
  );
}
