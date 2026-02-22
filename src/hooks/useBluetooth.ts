import { useCallback, useState } from "react";

export type BluetoothDeviceInfo = {
  id: string;
  name: string;
};

export function useBluetooth() {
  const [availableDevices, setAvailableDevices] = useState<BluetoothDeviceInfo[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<BluetoothDeviceInfo | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectDevice = useCallback(async () => {
    setIsConnecting(true);
    setError(null);

    try {
      if (!navigator.bluetooth) {
        throw new Error("Bluetooth не поддерживается в этом браузере");
      }

      // Web Bluetooth API предоставляет устройство через системный picker.
      // Сохраняем выбранное устройство как найденное и активное подключение.
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
      });

      const deviceInfo: BluetoothDeviceInfo = {
        id: device.id,
        name: device.name || "Без названия",
      };

      setAvailableDevices((prev) => {
        if (prev.some((item) => item.id === deviceInfo.id)) {
          return prev;
        }
        return [...prev, deviceInfo];
      });
      setConnectedDevice(deviceInfo);

      return deviceInfo;
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : "Ошибка подключения Bluetooth";
      setError(message);
      return null;
    } finally {
      setIsConnecting(false);
    }
  }, []);

  return {
    availableDevices,
    connectedDevice,
    isConnecting,
    error,
    connectDevice,
  };
}
