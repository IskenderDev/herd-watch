import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAnimalsContext } from "@/context/AnimalsContext";
import QrScannerStub from "@/components/QrScannerStub";
import { useBluetooth } from "@/hooks/useBluetooth";

export default function AddTagPage() {
  const navigate = useNavigate();
  const { addAnimal } = useAnimalsContext();
  const [showManual, setShowManual] = useState(false);
  const [manualId, setManualId] = useState("");
  const { availableDevices, connectedDevice, isConnecting, error, connectDevice } = useBluetooth();

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

  const handleBluetoothConnect = async () => {
    await connectDevice();
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

      <div className="space-y-3 bg-card rounded-xl p-4 shadow-sm border border-border">
        <h2 className="text-sm font-semibold text-foreground">Добавление по Bluetooth</h2>
        <button
          onClick={handleBluetoothConnect}
          disabled={isConnecting}
          className="w-full min-h-[48px] bg-secondary text-secondary-foreground rounded-xl font-semibold shadow active:scale-[0.97] transition-transform disabled:opacity-50"
        >
          {isConnecting ? "Подключение..." : "Подключить устройство"}
        </button>

        {error && (
          <div className="bg-destructive/10 text-destructive rounded-xl p-3 text-sm">
            {error}
          </div>
        )}

        {connectedDevice && (
          <div className="text-sm text-foreground">
            Подключено: <span className="font-semibold">{connectedDevice.name}</span>
          </div>
        )}

        {availableDevices.length > 0 && (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Найденные устройства:</p>
            <ul className="text-sm text-foreground space-y-1">
              {availableDevices.map((device) => (
                <li key={device.id} className="truncate">
                  {device.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Manual fallback */}
      <div className="text-center">
        <button
          onClick={() => setShowManual((v) => !v)}
          className="text-sm text-muted-foreground underline underline-offset-2"
        >
          Ввести ID вручную
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
