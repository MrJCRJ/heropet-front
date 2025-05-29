// src/hooks/useConnectionStatus.ts
import { useEffect, useState, useCallback } from "react";
import {
  checkConnection,
  isServerOnline,
  lastConnectionCheck,
} from "../../../api/httpClient";

// Função utilitária para formatar o tempo em MM:SS
const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export const useConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(isServerOnline);
  const [retryCount, setRetryCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [formattedTime, setFormattedTime] = useState(formatTime(0));

  // Atualiza o tempo formatado sempre que timeElapsed mudar
  useEffect(() => {
    setFormattedTime(formatTime(timeElapsed));
  }, [timeElapsed]);

  const checkStatus = useCallback(async () => {
    const status = await checkConnection();
    setIsOnline(status);
    setRetryCount((prev) => prev + 1);

    return status;
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let timeoutId: NodeJS.Timeout;
    let isMounted = true;

    const startConnectionCheck = async () => {
      const status = await checkStatus();

      if (!isMounted) return;

      if (!status) {
        // Se offline, verificar a cada 5 segundos
        intervalId = setInterval(() => {
          setTimeElapsed((prev) => prev + 5);
        }, 5000);

        timeoutId = setTimeout(startConnectionCheck, 5000);
      } else {
        setTimeElapsed(0);
      }
    };

    startConnectionCheck();

    return () => {
      isMounted = false;
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [checkStatus]);

  return {
    isOnline,
    retryCount,
    timeElapsed,
    formattedTime, // Adicionado o tempo formatado
    lastCheck: lastConnectionCheck,
  };
};
