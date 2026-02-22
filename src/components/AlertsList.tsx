import { useNavigate } from "react-router-dom";
import { Alert } from "@/types/animal";
import { DashboardFilter } from "./StatusCard";
import AnimalCard from "./AnimalCard";

interface AlertsListProps {
  alerts: Alert[];
  filter: DashboardFilter;
}

export default function AlertsList({ alerts, filter }: AlertsListProps) {
  const navigate = useNavigate();

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === "all") return true;
    if (filter === "warning") return alert.riskLevel === "attention";
    if (filter === "risk") return alert.riskLevel === "risk";
    return false;
  });

  if (filter === "normal") {
    return null;
  }

  if (filteredAlerts.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card px-4 py-6 text-center text-sm text-muted-foreground">
        Нет животных для выбранного фильтра
      </div>
    );
  }

  return (
    <section className="space-y-3">
      <h2 className="px-1 text-lg font-bold text-foreground">Требуют внимания</h2>
      {filteredAlerts.map((alert) => (
        <AnimalCard
          key={alert.id}
          alert={alert}
          onClick={() => navigate(`/animal/${alert.id}`)}
        />
      ))}
    </section>
  );
}
