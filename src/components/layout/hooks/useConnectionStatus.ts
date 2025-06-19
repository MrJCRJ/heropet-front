import { useEffect, useState } from "react";
import { checkConnection } from "../../../api/httpClient";

interface ConnectionStatus {
  isOnline: boolean;
  isLoading: boolean;
  lastCheck: Date | null;
}

export const useConnectionStatus = (): ConnectionStatus => {
  const [status, setStatus] = useState<ConnectionStatus>({
    isOnline: false,
    isLoading: true,
    lastCheck: null,
  });

  useEffect(() => {
    const checkServer = async () => {
      try {
        const isConnected = await checkConnection();
        setStatus({
          isOnline: isConnected,
          isLoading: false,
          lastCheck: new Date(),
        });
      } catch {
        // Considera online mesmo com erro 404, pois o servidor respondeu
        setStatus({
          isOnline: true,
          isLoading: false,
          lastCheck: new Date(),
        });
      }
    };

    checkServer();
    const intervalId = setInterval(checkServer, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return status;
};
