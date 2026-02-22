import { useMemo, useState } from "react";
import clsx from "clsx";
import { ChevronDown, CheckCircle2 } from "lucide-react";
import { Animal } from "@/types/animal";
import { DashboardFilter } from "./StatusCard";

interface NormalAnimalsSectionProps {
  animals: Animal[];
  summaryNormalCount: number;
  filter: DashboardFilter;
}

export default function NormalAnimalsSection({ animals, summaryNormalCount, filter }: NormalAnimalsSectionProps) {
  const [expanded, setExpanded] = useState(false);

  const normalAnimals = useMemo(() => animals.filter((animal) => animal.riskLevel === "normal"), [animals]);

  const fallbackNormals = useMemo(
    () =>
      Array.from({ length: Math.min(summaryNormalCount, 5) }, (_, index) => ({
        id: `N-${String(index + 1).padStart(3, "0")}`,
        description: "Активность в норме",
      })),
    [summaryNormalCount],
  );

  const sourceItems =
    normalAnimals.length > 0
      ? normalAnimals.map((animal) => ({ id: animal.id, description: animal.reason || "Активность в норме" }))
      : fallbackNormals;

  if (sourceItems.length === 0) {
    return null;
  }

  const visibleItems = expanded || filter === "normal" ? sourceItems : sourceItems.slice(0, 3);

  return (
    <section className="space-y-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="flex w-full items-center justify-between"
      >
        <h3 className="text-base font-bold text-foreground">В норме ({summaryNormalCount})</h3>
        <ChevronDown
          size={18}
          className={clsx("transition-transform duration-200", (expanded || filter === "normal") && "rotate-180")}
        />
      </button>

      <div className="space-y-3">
        {visibleItems.map((animal) => (
          <div
            key={animal.id}
            className="flex items-center justify-between rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm"
          >
            <p className="font-semibold text-foreground">№{animal.id}</p>
            <div className="flex items-center text-green-700">
              <CheckCircle2 size={18} className="mr-2" />
              <span>{animal.description}</span>
            </div>
          </div>
        ))}
      </div>

      {filter !== "normal" && sourceItems.length > 3 && !expanded && (
        <p className="text-xs text-muted-foreground">Показаны первые 3 животных</p>
      )}
    </section>
  );
}
