// src/hooks/useConnectionStatus.ts
import { useEffect, useState } from "react";
import { checkConnection, lastConnectionCheck } from "../../../api/httpClient";

export const useConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [shouldReload, setShouldReload] = useState(false);

  useEffect(() => {
    const checkInterval = 5000; // 5 segundos

    const checkServer = async () => {
      const status = await checkConnection();

      if (status !== isOnline) {
        setIsOnline(status);

        // Recarrega apenas quando volta a ficar online
        if (status) {
          setShouldReload(true);
        }
      }
    };

    // Verificação imediata
    checkServer();

    // Verificação periódica
    const intervalId = setInterval(checkServer, checkInterval);

    return () => clearInterval(intervalId);
  }, [isOnline]);

  // Efeito para recarregar a página
  useEffect(() => {
    if (shouldReload) {
      window.location.reload();
    }
  }, [shouldReload]);

  return {
    isOnline,
    lastCheck: lastConnectionCheck,
  };
};
