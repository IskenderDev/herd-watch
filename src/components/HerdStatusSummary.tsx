import { DashboardFilter } from "./StatusCard";
import StatusCard from "./StatusCard";

interface HerdStatusSummaryProps {
  normal: number;
  attention: number;
  risk: number;
  activeFilter: DashboardFilter;
  onFilterChange: (filter: DashboardFilter) => void;
}

export default function HerdStatusSummary({
  normal,
  attention,
  risk,
  activeFilter,
  onFilterChange,
}: HerdStatusSummaryProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <StatusCard
        count={normal}
        label="В норме"
        filterValue="normal"
        isActive={activeFilter === "normal"}
        onClick={() => onFilterChange(activeFilter === "normal" ? "all" : "normal")}
      />
      <StatusCard
        count={attention}
        label="Внимание"
        filterValue="warning"
        isActive={activeFilter === "warning"}
        onClick={() => onFilterChange(activeFilter === "warning" ? "all" : "warning")}
      />
      <StatusCard
        count={risk}
        label="Риск"
        filterValue="risk"
        isActive={activeFilter === "risk"}
        onClick={() => onFilterChange(activeFilter === "risk" ? "all" : "risk")}
      />
    </div>
  );
}
