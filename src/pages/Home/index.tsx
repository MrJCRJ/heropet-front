import { useState } from "react";
import FinancialHistory from "./FinancialHistory";
import StockHistory from "./StockHistory";

const Home = () => {
  const [activeTab, setActiveTab] = useState<"financial" | "stock">(
    "financial"
  );

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Resumo Geral</h2>

        {/* Botões de navegação */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "financial"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("financial")}
          >
            Histórico Financeiro
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "stock"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("stock")}
          >
            Histórico de Estoque
          </button>
        </div>

        {/* Conteúdo das abas */}
        {activeTab === "financial" && <FinancialHistory />}
        {activeTab === "stock" && <StockHistory />}
      </div>
    </div>
  );
};

export default Home;
