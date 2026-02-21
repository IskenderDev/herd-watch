import { useState, useCallback } from "react";
import { Animal, Alert } from "@/types/animal";
import { mockAnimals, mockAlerts, herdSummary } from "@/mock/mockData";

export function useAnimals() {
  const [animals, setAnimals] = useState<Animal[]>(mockAnimals);
  const [alerts] = useState<Alert[]>(mockAlerts);
  const [summary] = useState(herdSummary);

  const getAnimal = useCallback(
    (id: string) => animals.find((a) => a.id === id),
    [animals]
  );

  const setAction = useCallback(
    (id: string, action: "checked" | "treatment" | "false_alarm") => {
      setAnimals((prev) =>
        prev.map((a) => (a.id === id ? { ...a, lastAction: action } : a))
      );
    },
    []
  );

  const addAnimal = useCallback((tagId: string) => {
    const newId = String(Date.now()).slice(-4);
    const newAnimal: Animal = {
      id: newId,
      tagId,
      riskLevel: "normal",
      reason: "Только что добавлено",
      usualActivityLevel: 50,
      currentActivityLevel: 50,
      history: [{ dayLabel: "Сегодня", status: "normal" }],
    };
    setAnimals((prev) => [...prev, newAnimal]);
    return newId;
  }, []);

  // Sorted alerts: risk first, then attention; within same level by durationHours desc
  const sortedAlerts = [...alerts].sort((a, b) => {
    const priority = { risk: 0, attention: 1, normal: 2 };
    if (priority[a.riskLevel] !== priority[b.riskLevel]) {
      return priority[a.riskLevel] - priority[b.riskLevel];
    }
    return b.durationHours - a.durationHours;
  });

  return { animals, alerts: sortedAlerts, summary, getAnimal, setAction, addAnimal };
}
