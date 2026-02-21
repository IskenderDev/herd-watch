import { useParams, useNavigate } from "react-router-dom";
import { useAnimalsContext } from "@/context/AnimalsContext";
import AnimalStatusBadge from "@/components/AnimalStatusBadge";
import ActivityBar from "@/components/ActivityBar";
import StateHistory from "@/components/StateHistory";
import ActionButtons from "@/components/ActionButtons";

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

  return (
    <div className="space-y-5">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-muted-foreground font-medium active:text-foreground"
      >
        ← Назад
      </button>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">
            №{animal.id}
          </h1>
          <p className="text-xs text-muted-foreground">{animal.tagId}</p>
        </div>
        <AnimalStatusBadge level={animal.riskLevel} />
      </div>

      {/* Reason */}
      <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
        <p className="text-base text-foreground font-medium">{animal.reason}</p>
      </div>

      {/* Activity */}
      <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
        <ActivityBar
          usualLevel={animal.usualActivityLevel}
          currentLevel={animal.currentActivityLevel}
        />
      </div>

      {/* History */}
      <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
        <StateHistory history={animal.history} />
      </div>

      {/* Actions */}
      <ActionButtons
        animalId={animal.id}
        lastAction={animal.lastAction}
        onAction={setAction}
      />
    </div>
  );
}
