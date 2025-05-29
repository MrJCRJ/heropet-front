// src/hooks/useConnectionStatus.ts
import { useEffect, useState } from "react";
import {
  checkConnection,
  isServerOnline,
  lastConnectionCheck,
} from "../../../api/httpClient";

export const useConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(isServerOnline);
  const [retryCount, setRetryCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let timeoutId: NodeJS.Timeout;

    const checkStatus = async () => {
      const status = await checkConnection();
      setIsOnline(status);
      setRetryCount((prev) => prev + 1);

      if (!status) {
        // Se offline, verificar a cada 5 segundos
        intervalId = setInterval(() => {
          setTimeElapsed((prev) => prev + 5);
        }, 5000);

        timeoutId = setTimeout(checkStatus, 5000);
      } else {
        setTimeElapsed(0);
      }
    };

    checkStatus();

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  return { isOnline, retryCount, timeElapsed, lastCheck: lastConnectionCheck };
};
