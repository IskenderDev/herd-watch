import { Animal, Alert } from "@/types/animal";

export const mockAnimals: Animal[] = [
  {
    id: "7",
    tagId: "KG-2024-007",
    riskLevel: "risk",
    reason: "Слишком мало активности за последние 36 часов",
    usualActivityLevel: 75,
    currentActivityLevel: 20,
    history: [
      { timestamp: "Пн", activityLevel: 76 },
      { timestamp: "Вт", activityLevel: 74 },
      { timestamp: "Ср", activityLevel: 77 },
      { timestamp: "Чт", activityLevel: 72 },
      { timestamp: "Пт", activityLevel: 54 },
      { timestamp: "Сб", activityLevel: 31 },
      { timestamp: "Вс", activityLevel: 20 },
    ],
  },
  {
    id: "23",
    tagId: "KG-2024-023",
    riskLevel: "risk",
    reason: "Двигается меньше своей нормы второй день",
    usualActivityLevel: 80,
    currentActivityLevel: 15,
    history: [
      { timestamp: "Пн", activityLevel: 81 },
      { timestamp: "Вт", activityLevel: 80 },
      { timestamp: "Ср", activityLevel: 79 },
      { timestamp: "Чт", activityLevel: 60 },
      { timestamp: "Пт", activityLevel: 55 },
      { timestamp: "Сб", activityLevel: 28 },
      { timestamp: "Вс", activityLevel: 15 },
    ],
  },
  {
    id: "112",
    tagId: "KG-2024-112",
    riskLevel: "attention",
    reason: "Нестабильная активность за последние сутки",
    usualActivityLevel: 65,
    currentActivityLevel: 40,
    history: [
      { timestamp: "Пн", activityLevel: 64 },
      { timestamp: "Вт", activityLevel: 67 },
      { timestamp: "Ср", activityLevel: 63 },
      { timestamp: "Чт", activityLevel: 66 },
      { timestamp: "Пт", activityLevel: 62 },
      { timestamp: "Сб", activityLevel: 48 },
      { timestamp: "Вс", activityLevel: 40 },
    ],
  },
  {
    id: "45",
    tagId: "KG-2024-045",
    riskLevel: "attention",
    reason: "Отделяется от стада чаще обычного",
    usualActivityLevel: 70,
    currentActivityLevel: 50,
    history: [
      { timestamp: "Пн", activityLevel: 69 },
      { timestamp: "Вт", activityLevel: 71 },
      { timestamp: "Ср", activityLevel: 68 },
      { timestamp: "Чт", activityLevel: 70 },
      { timestamp: "Пт", activityLevel: 58 },
      { timestamp: "Сб", activityLevel: 54 },
      { timestamp: "Вс", activityLevel: 50 },
    ],
  },
  {
    id: "88",
    tagId: "KG-2024-088",
    riskLevel: "attention",
    reason: "Меньше ест в последние 2 дня",
    usualActivityLevel: 60,
    currentActivityLevel: 35,
    history: [
      { timestamp: "Пн", activityLevel: 61 },
      { timestamp: "Вт", activityLevel: 59 },
      { timestamp: "Ср", activityLevel: 62 },
      { timestamp: "Чт", activityLevel: 60 },
      { timestamp: "Пт", activityLevel: 58 },
      { timestamp: "Сб", activityLevel: 47 },
      { timestamp: "Вс", activityLevel: 35 },
    ],
  },
  {
    id: "56",
    tagId: "KG-2024-056",
    riskLevel: "attention",
    reason: "Нетипичный паттерн движения",
    usualActivityLevel: 72,
    currentActivityLevel: 45,
    history: [
      { timestamp: "Пн", activityLevel: 73 },
      { timestamp: "Вт", activityLevel: 71 },
      { timestamp: "Ср", activityLevel: 72 },
      { timestamp: "Чт", activityLevel: 70 },
      { timestamp: "Пт", activityLevel: 68 },
      { timestamp: "Сб", activityLevel: 55 },
      { timestamp: "Вс", activityLevel: 45 },
    ],
  },
];

// Alerts sorted: risk first, then attention, within same level — by durationHours descending (longest first = most urgent)
export const mockAlerts: Alert[] = [
  { id: "23", riskLevel: "risk", message: "Активность снижена на 40%", durationHours: 48 },
  { id: "7", riskLevel: "risk", message: "Активность снижена на 32%", durationHours: 36 },
  { id: "112", riskLevel: "attention", message: "Нестабильность 24 часа", durationHours: 24 },
  { id: "45", riskLevel: "attention", message: "Отделяется от стада", durationHours: 18 },
  { id: "88", riskLevel: "attention", message: "Меньше ест 2 дня", durationHours: 48 },
  { id: "56", riskLevel: "attention", message: "Нетипичное поведение", durationHours: 12 },
];

// 184 normal + 4 attention + 2 risk = 190 total (some normal animals not listed individually)
export const herdSummary = {
  normal: 184,
  attention: 4,
  risk: 2,
};
