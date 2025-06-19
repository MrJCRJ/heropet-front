import { useEffect, useState } from "react";
import { checkConnection, lastConnectionCheck } from "../../../api/httpClient";

export const useConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [shouldReload, setShouldReload] = useState(false);

  useEffect(() => {
    if (shouldReload) {
      window.location.reload();
      return; // Não continua após recarregar
    }

    const checkServer = async () => {
      const status = await checkConnection();

      if (status !== isOnline) {
        setIsOnline(status);
        if (!status) setShouldReload(true); // Recarrega quando cai a conexão
      }
    };

    // Verificação imediata
    checkServer();

    // Verificação periódica apenas se ainda ativo
    const intervalId = setInterval(checkServer, 5000);

    return () => clearInterval(intervalId);
  }, [isOnline, shouldReload]);

  return {
    isOnline,
    lastCheck: lastConnectionCheck,
  };
};
