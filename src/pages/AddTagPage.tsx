import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAnimalsContext } from "@/context/AnimalsContext";
import QrScannerStub from "@/components/QrScannerStub";

export default function AddTagPage() {
  const navigate = useNavigate();
  const { addAnimal } = useAnimalsContext();
  const [showManual, setShowManual] = useState(false);
  const [manualId, setManualId] = useState("");

  const handleScan = (tagId: string) => {
    const newId = addAnimal(tagId);
    navigate(`/animal/${newId}`);
  };

  const handleManualSubmit = () => {
    const trimmed = manualId.trim();
    if (!trimmed) return;
    const newId = addAnimal(trimmed);
    navigate(`/animal/${newId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Добавить бирку</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Привязать ушную бирку к животному
        </p>
      </div>

      <QrScannerStub onScan={handleScan} />

      {/* Manual fallback */}
      <div className="text-center">
        <button
          onClick={() => setShowManual((v) => !v)}
          className="text-sm text-muted-foreground underline underline-offset-2"
        >
          ⌨️ Ввести ID вручную
        </button>
      </div>

      {showManual && (
        <div className="space-y-3">
          <input
            type="text"
            value={manualId}
            onChange={(e) => setManualId(e.target.value)}
            placeholder="Например: KG-2024-199"
            maxLength={20}
            className="w-full text-lg border border-input bg-card rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            onClick={handleManualSubmit}
            disabled={!manualId.trim()}
            className="w-full min-h-[48px] bg-primary text-primary-foreground rounded-xl font-semibold shadow active:scale-[0.97] transition-transform disabled:opacity-40"
          >
            Сохранить
          </button>
        </div>
      )}
    </div>
  );
}
