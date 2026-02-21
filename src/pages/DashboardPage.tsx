import HerdStatusSummary from "@/components/HerdStatusSummary";
import AlertsList from "@/components/AlertsList";
import { useAnimalsContext } from "@/context/AnimalsContext";

export default function DashboardPage() {
  const { summary, alerts } = useAnimalsContext();

  return (
    <div className="space-y-6">
      <HerdStatusSummary
        normal={summary.normal}
        attention={summary.attention}
        risk={summary.risk}
      />
      <AlertsList alerts={alerts} />
    </div>
  );
}
