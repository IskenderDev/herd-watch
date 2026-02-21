import { useState } from "react";
import { toast } from "sonner";

interface ActionButtonsProps {
  animalId: string;
  lastAction?: "checked" | "treatment" | "false_alarm";
  onAction: (id: string, action: "checked" | "treatment" | "false_alarm") => void;
}

const actions = [
  { key: "checked" as const, emoji: "✅", label: "Проверил" },
  { key: "treatment" as const, emoji: "🩺", label: "Лечим" },
  { key: "false_alarm" as const, emoji: "❌", label: "Ложная тревога" },
];

const toastMessages = {
  checked: "Отмечено как проверено",
  treatment: "Начато лечение",
  false_alarm: "Отмечено как ложная тревога",
};

export default function ActionButtons({ animalId, lastAction, onAction }: ActionButtonsProps) {
  const [active, setActive] = useState<string | undefined>(lastAction);

  const handleClick = (key: "checked" | "treatment" | "false_alarm") => {
    setActive(key);
    onAction(animalId, key);
    toast.success(toastMessages[key]);
  };

  return (
    <div className="space-y-2 mt-4">
      <h3 className="text-sm font-semibold text-foreground">Действия</h3>
      <div className="grid grid-cols-1 gap-2">
        {actions.map(({ key, emoji, label }) => (
          <button
            key={key}
            onClick={() => handleClick(key)}
            className={`w-full min-h-[48px] rounded-xl font-semibold text-base shadow transition-all active:scale-[0.97] ${
              active === key
                ? "bg-primary text-primary-foreground ring-2 ring-ring"
                : "bg-card text-foreground border border-border hover:bg-accent"
            }`}
          >
            {emoji} {label}
          </button>
        ))}
      </div>
    </div>
  );
}
