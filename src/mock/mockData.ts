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
      { dayLabel: "Пн", status: "normal" },
      { dayLabel: "Вт", status: "normal" },
      { dayLabel: "Ср", status: "normal" },
      { dayLabel: "Чт", status: "normal" },
      { dayLabel: "Пт", status: "attention" },
      { dayLabel: "Сб", status: "risk" },
      { dayLabel: "Вс", status: "risk" },
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
      { dayLabel: "Пн", status: "normal" },
      { dayLabel: "Вт", status: "normal" },
      { dayLabel: "Ср", status: "normal" },
      { dayLabel: "Чт", status: "attention" },
      { dayLabel: "Пт", status: "attention" },
      { dayLabel: "Сб", status: "risk" },
      { dayLabel: "Вс", status: "risk" },
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
      { dayLabel: "Пн", status: "normal" },
      { dayLabel: "Вт", status: "normal" },
      { dayLabel: "Ср", status: "normal" },
      { dayLabel: "Чт", status: "normal" },
      { dayLabel: "Пт", status: "normal" },
      { dayLabel: "Сб", status: "attention" },
      { dayLabel: "Вс", status: "attention" },
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
      { dayLabel: "Пн", status: "normal" },
      { dayLabel: "Вт", status: "normal" },
      { dayLabel: "Ср", status: "normal" },
      { dayLabel: "Чт", status: "normal" },
      { dayLabel: "Пт", status: "attention" },
      { dayLabel: "Сб", status: "attention" },
      { dayLabel: "Вс", status: "attention" },
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
      { dayLabel: "Пн", status: "normal" },
      { dayLabel: "Вт", status: "normal" },
      { dayLabel: "Ср", status: "normal" },
      { dayLabel: "Чт", status: "normal" },
      { dayLabel: "Пт", status: "normal" },
      { dayLabel: "Сб", status: "normal" },
      { dayLabel: "Вс", status: "attention" },
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
      { dayLabel: "Пн", status: "normal" },
      { dayLabel: "Вт", status: "normal" },
      { dayLabel: "Ср", status: "normal" },
      { dayLabel: "Чт", status: "normal" },
      { dayLabel: "Пт", status: "normal" },
      { dayLabel: "Сб", status: "attention" },
      { dayLabel: "Вс", status: "attention" },
    ],
  },
];

// Alerts sorted: risk first, then attention, within same level — by durationHours descending (longest first = most urgent)
export const mockAlerts: Alert[] = [
  { id: "23", riskLevel: "risk", message: "Активность снижена 48 часов", durationHours: 48 },
  { id: "7", riskLevel: "risk", message: "Активность снижена 36 часов", durationHours: 36 },
  { id: "112", riskLevel: "attention", message: "Нестабильность 24 часа", durationHours: 24 },
  { id: "45", riskLevel: "attention", message: "Отделяется от стада", durationHours: 18 },
  { id: "88", riskLevel: "attention", message: "Меньше ест 2 дня", durationHours: 48 },
  { id: "56", riskLevel: "attention", message: "Нетипичное движение", durationHours: 12 },
];

// 184 normal + 4 attention + 2 risk = 190 total (some normal animals not listed individually)
export const herdSummary = {
  normal: 184,
  attention: 4,
  risk: 2,
};
