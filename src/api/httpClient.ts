import axios from "axios";

export let isServerOnline = false;
export let lastConnectionCheck = 0;
let connectionActive = true;

export const checkConnection = async () => {
  if (!connectionActive) return false;

  try {
    await axios.get(
      import.meta.env.VITE_API_URL || "http://localhost:3000/health",
      {
        timeout: 3000,
        validateStatus: (status) => {
          if (status === 404) {
            connectionActive = false;
            return false; // Considera 404 como erro
          }
          return true;
        },
      }
    );

    isServerOnline = true;
    lastConnectionCheck = Date.now();
    return true;
  } catch {
    isServerOnline = false;
    lastConnectionCheck = Date.now();
    return false;
  }
};

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false,
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Erro na resposta:", error.response.data);
      return Promise.reject({
        message: error.response.data.message || "Erro na requisição",
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.code === "ERR_NETWORK") {
      return Promise.reject(
        new Error(
          "Não foi possível conectar ao servidor. Verifique sua conexão."
        )
      );
    }
    return Promise.reject(new Error("Ocorreu um erro desconhecido"));
  }
);

export default httpClient;
