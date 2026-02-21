import { useState } from "react";

const languages = [
  { code: "ru", label: "Русский" },
  { code: "ky", label: "Кыргызча" },
];

export default function SettingsPage() {
  const [lang, setLang] = useState("ru");

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-foreground">Настройки</h1>

      <div className="bg-card rounded-xl p-4 shadow-sm border border-border space-y-3">
        <label className="text-sm font-semibold text-foreground">Язык</label>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="w-full border border-input bg-background rounded-xl px-4 py-3 text-foreground text-base focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {languages.map((l) => (
            <option key={l.code} value={l.code}>
              {l.label}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-muted rounded-xl p-4 text-center">
        <p className="text-sm text-muted-foreground">
          MVP версия · Данные тестовые
        </p>
      </div>
    </div>
  );
}
