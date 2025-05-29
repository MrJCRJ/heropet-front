import axios from "axios";

export let isServerOnline = false;
export let lastConnectionCheck = 0;
export const checkConnection = async () => {
  try {
    await axios.get(import.meta.env.VITE_API_URL || "http://localhost:3000", {
      timeout: 3000,
      validateStatus: function (status) {
        // Considera qualquer status menor que 500 como sucesso
        return status < 500;
      },
    });
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

// Interceptor para tratamento global de erros
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Erros 4xx/5xx
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
    // Adicione um tratamento padrão para outros tipos de erro
    return Promise.reject(new Error("Ocorreu um erro desconhecido"));
  }
);

export default httpClient;
