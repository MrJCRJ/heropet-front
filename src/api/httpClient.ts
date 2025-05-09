import axios from "axios";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  timeout: 5000, // Timeout de 5 segundos

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false, // Adicione esta linha
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
    return Promise.reject(error);
  }
);

export default httpClient;
