export type RiskLevel = "normal" | "attention" | "risk";

export type AnimalHistoryEntry = {
  dayLabel: string;
  status: RiskLevel;
};

export type Animal = {
  id: string;
  tagId: string;
  name?: string;
  riskLevel: RiskLevel;
  reason: string;
  usualActivityLevel: number; // 0-100
  currentActivityLevel: number; // 0-100
  history: AnimalHistoryEntry[];
  lastAction?: "checked" | "treatment" | "false_alarm";
};

export type Alert = {
  id: string; // animal id
  riskLevel: RiskLevel;
  message: string;
  durationHours: number;
};
