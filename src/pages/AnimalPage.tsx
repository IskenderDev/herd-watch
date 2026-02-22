import { Bot } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useAnimalsContext } from "@/context/AnimalsContext";
import AnimalStatusBadge from "@/components/AnimalStatusBadge";
import ActivityBar from "@/components/ActivityBar";
import StateHistory from "@/components/StateHistory";
import ActionButtons from "@/components/ActionButtons";

const statusMap = {
  normal: "Норма",
  attention: "Внимание",
  risk: "Риск",
} as const;

export default function AnimalPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getAnimal, setAction } = useAnimalsContext();

  const animal = getAnimal(id || "");

  if (!animal) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-xl text-muted-foreground">Животное не найдено</p>
        <button
          onClick={() => navigate("/")}
          className="text-primary font-semibold"
        >
          ← На главную
        </button>
      </div>
    );
  }

  const cowSummary = `Корова №${animal.id}, статус ${statusMap[animal.riskLevel]}. Причина: ${animal.reason}. Текущая активность ${animal.currentActivityLevel}%, обычная ${animal.usualActivityLevel}%.`;

  return (
    <div className="space-y-5">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-muted-foreground font-medium active:text-foreground"
      >
        ← Назад
      </button>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">
            №{animal.id}
          </h1>
          <p className="text-xs text-muted-foreground">{animal.tagId}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              navigate("/ai-assistant", {
                state: {
                  contextType: "cow",
                  cowId: animal.id,
                  cowNumber: animal.id,
                  cowSummary,
                  cowStatus: statusMap[animal.riskLevel],
                  cowMetric: `Активность ${animal.currentActivityLevel}% (обычно ${animal.usualActivityLevel}%)`,
                },
              })
            }
            className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
          >
            <Bot className="h-3.5 w-3.5" /> Спросить ИИ
          </button>
          <AnimalStatusBadge level={animal.riskLevel} />
        </div>
      </div>

      <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
        <p className="text-base text-foreground font-medium">{animal.reason}</p>
      </div>

      <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
        <ActivityBar
          usualLevel={animal.usualActivityLevel}
          currentLevel={animal.currentActivityLevel}
        />
      </div>

      <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
        <StateHistory history={animal.history} />
      </div>

      <ActionButtons
        animalId={animal.id}
        lastAction={animal.lastAction}
        onAction={setAction}
      />
    </div>
  );
}
