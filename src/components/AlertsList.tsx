import { useNavigate } from "react-router-dom";
import { Alert } from "@/types/animal";
import AlertCard from "./AlertCard";

interface AlertsListProps {
  alerts: Alert[];
}

export default function AlertsList({ alerts }: AlertsListProps) {
  const navigate = useNavigate();

  if (alerts.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Нет активных алертов 🎉
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold text-foreground">Требуют внимания</h2>
      {alerts.map((alert) => (
        <AlertCard
          key={alert.id}
          alert={alert}
          onClick={() => navigate(`/animal/${alert.id}`)}
        />
      ))}
    </div>
  );
}
