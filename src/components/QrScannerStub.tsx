import { useState } from "react";

interface QrScannerStubProps {
  onScan: (tagId: string) => void;
}

/**
 * QR Scanner stub — simulates camera access and QR scanning.
 * In production, replace with real navigator.mediaDevices.getUserMedia + QR decoder.
 */
export default function QrScannerStub({ onScan }: QrScannerStubProps) {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    setScanning(true);
    setError(null);

    try {
      // Check if camera is available
      if (!navigator.mediaDevices?.getUserMedia) {
        setError("Камера недоступна на этом устройстве");
        setScanning(false);
        return;
      }

      // Simulate scanning delay
      await new Promise((r) => setTimeout(r, 1500));

      // Mock successful scan
      const mockTagId = `KG-2024-${String(Date.now()).slice(-3)}`;
      onScan(mockTagId);
    } catch {
      setError("Не удалось получить доступ к камере");
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Scanner viewport area */}
      <div className="relative aspect-square max-w-[280px] mx-auto bg-muted rounded-2xl border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
        {scanning ? (
          <div className="text-center space-y-2">
            <div className="text-4xl animate-pulse-soft">📷</div>
            <p className="text-sm text-muted-foreground">Сканирование...</p>
          </div>
        ) : (
          <div className="text-center space-y-2 p-4">
            <div className="text-4xl">📷</div>
            <p className="text-sm text-muted-foreground">
              Наведите камеру на QR-код бирки
            </p>
          </div>
        )}
      </div>

      <button
        onClick={handleScan}
        disabled={scanning}
        className="w-full min-h-[56px] bg-primary text-primary-foreground rounded-xl font-bold text-lg shadow-md active:scale-[0.97] transition-transform disabled:opacity-50"
      >
        {scanning ? "Сканирую..." : "📷 Сканировать QR-код"}
      </button>

      {error && (
        <div className="bg-destructive/10 text-destructive rounded-xl p-3 text-sm text-center">
          {error}
        </div>
      )}
    </div>
  );
}
