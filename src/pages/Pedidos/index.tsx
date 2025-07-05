import { useState, useEffect } from "react";
import { usePedidoList } from "../../hooks/usePedidoList";
import { PedidoTable } from "./List/ListTable";
import { EstoqueSummary } from "./List/Summary/EstoqueSummary";
import { FinancialSummary } from "./List/Summary/FinancialSummary";
import { ParceirosSummary } from "./List/Summary/Parceiros";

import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { Alert } from "../../components/ui/Alert";

const PedidoList = () => {
  const {
    pedidos = [],
    loading,
    error,
    filtroTipo,
    filtroStatus,
    ordenacao,
    selectedMonth,
    selectedYear,
    handleFilterChange,
    toggleOrdenacao,
  } = usePedidoList();

  // Estados para controle do carrossel
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideCount = 4; // Financial, Estoque, Parceiros e PedidoTable

  // Configuração do carrossel automático com transição mais lenta
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 3000); // Muda a cada 2 segundos

    return () => clearInterval(interval);
  }, [isPaused]);

  // Função para navegação
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (loading && pedidos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-2">
        <LoadingSpinner size="lg" />
        <p className="text-gray-600">Carregando dados...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Alert type="error" message={error} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Título centralizado */}
      <h1 className="text-2xl font-bold mb-6 text-center">Sumário</h1>

      {/* Botões de navegação */}
      <div className="flex justify-between space-x-2 w-full">
        <button
          onClick={() => goToSlide(0)}
          className={`flex-1 py-3 rounded-lg transition-all duration-300 ${
            currentSlide === 0
              ? "bg-blue-600 text-white font-medium"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Financeiro
        </button>
        <button
          onClick={() => goToSlide(1)}
          className={`flex-1 py-3 rounded-lg transition-all duration-300 ${
            currentSlide === 1
              ? "bg-blue-600 text-white font-medium"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Estoque
        </button>
        <button
          onClick={() => goToSlide(2)}
          className={`flex-1 py-3 rounded-lg transition-all duration-300 ${
            currentSlide === 2
              ? "bg-blue-600 text-white font-medium"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Parceiros
        </button>
        <button
          onClick={() => goToSlide(3)}
          className={`flex-1 py-3 rounded-lg transition-all duration-300 ${
            currentSlide === 3
              ? "bg-blue-600 text-white font-medium"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Pedidos
        </button>
      </div>

      {/* Contêiner do carrossel */}
      <div
        className="relative overflow-hidden rounded-lg mb-6 min-h-[400px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Slides do carrossel com transição lenta */}
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {/* Slide 1: Financeiro */}
          <div className="w-full flex-shrink-0 p-4">
            <FinancialSummary pedidos={pedidos} filtroTipo={filtroTipo} />
          </div>

          {/* Slide 2: Estoque */}
          <div className="w-full flex-shrink-0 p-4">
            <EstoqueSummary pedidos={pedidos} />
          </div>

          {/* Slide 3: Parceiros */}
          <div className="w-full flex-shrink-0 p-4">
            <ParceirosSummary pedidos={pedidos} />
          </div>

          {/* Slide 4: Tabela de Pedidos */}
          <div className="w-full flex-shrink-0 p-4">
            <PedidoTable
              pedidos={pedidos}
              ordenacao={ordenacao}
              filtroTipo={filtroTipo}
              filtroStatus={filtroStatus}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              onOrdenarClick={toggleOrdenacao}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PedidoList;
