// file: src/pages/Home/index.tsx
import { useState } from "react";
import FinancialHistory from "./Financial/FinancialHistory";
import SalaryEvolution from "./SalaryEvolution";
import StockHistory from "./StockHistory";

type TabType = "financial" | "salario" | "estoque";

const Home = () => {
  const [activeTab, setActiveTab] = useState<TabType>("financial");

  const tabs: { id: TabType; label: string }[] = [
    { id: "financial", label: "Histórico Financeiro" },
    { id: "salario", label: "Folha de Pagamento" },
    { id: "estoque", label: "Histórico de Estoque" },
  ];

  const TabButton = ({ tab }: { tab: (typeof tabs)[number] }) => (
    <button
      className={`py-2 px-4 font-medium ${
        activeTab === tab.id
          ? "text-blue-600 border-b-2 border-blue-600"
          : "text-gray-500 hover:text-gray-700"
      }`}
      onClick={() => setActiveTab(tab.id)}
    >
      {tab.label}
    </button>
  );

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Resumo Geral</h2>

        {/* Botões de navegação */}
        <div className="flex border-b border-gray-200 mb-6">
          {tabs.map((tab) => (
            <TabButton key={tab.id} tab={tab} />
          ))}
        </div>

        {/* Conteúdo das abas */}
        {activeTab === "financial" && <FinancialHistory />}
        {activeTab === "salario" && <SalaryEvolution />}
        {activeTab === "estoque" && <StockHistory />}

        {/* Adicione mais conteúdo aqui, se necessário */}
      </div>
    </div>
  );
};

export default Home;
