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

  const filteredAnimals = alerts.filter((alert) => {
    if (filter === "all") return true;
    if (filter === "warning") return alert.riskLevel === "attention";
    return alert.riskLevel === filter;
  });

  if (filteredAnimals.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card px-4 py-6 text-center text-sm text-muted-foreground">
        Нет животных для выбранного фильтра
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="px-1 text-lg font-bold text-foreground">Требуют внимания</h2>
      {filteredAnimals.map((alert) => (
        <AnimalCard
          key={alert.id}
          alert={alert}
          onClick={() => navigate(`/animal/${alert.id}`)}
        />
      ))}
    </div>
  );
}
