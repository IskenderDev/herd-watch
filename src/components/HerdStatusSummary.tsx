import clsx from "clsx";
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
  const handleFilterClick = (value: Exclude<DashboardFilter, "all">) => {
    onFilterChange(activeFilter === value ? "all" : value);
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-4">
        <StatusCard
          count={normal}
          label="В норме"
          filterValue="normal"
          isActive={activeFilter === "normal"}
          onClick={() => handleFilterClick("normal")}
        />
        <StatusCard
          count={attention}
          label="Внимание"
          filterValue="warning"
          isActive={activeFilter === "warning"}
          onClick={() => handleFilterClick("warning")}
        />
        <StatusCard
          count={risk}
          label="Риск"
          filterValue="risk"
          isActive={activeFilter === "risk"}
          onClick={() => handleFilterClick("risk")}
        />
      </div>

      <button
        onClick={() => onFilterChange("all")}
        className={clsx(
          "rounded-full px-3 py-1 text-sm font-medium transition-all duration-200",
          activeFilter === "all"
            ? "bg-green-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200",
        )}
      >
        Все
      </button>
    </div>
  );
}
