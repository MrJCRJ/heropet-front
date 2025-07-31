import { useState } from "react";
import { usePedidoList } from "../../hooks/usePedidoList";
import { PedidoTable } from "./List/ListTable";
import { EstoqueSummary } from "./List/Summary/EstoqueSummary";
import { FinancialSummary } from "./List/Summary/FinancialSummary";
import { ParceirosSummary } from "./List/Summary/Parceiros";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { Alert } from "../../components/ui/Alert";

// Definição dos tipos
type SlideComponent = {
  id: number;
  label: string;
  component: React.ReactNode;
};

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

  const [currentSlide, setCurrentSlide] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState<
    "left" | "right"
  >("left");

  // Componentes dos slides
  const slides: SlideComponent[] = [
    {
      id: 0,
      label: "Financeiro",
      component: <FinancialSummary pedidos={pedidos} filtroTipo={filtroTipo} />,
    },
    {
      id: 1,
      label: "Estoque",
      component: <EstoqueSummary pedidos={pedidos} />,
    },
    {
      id: 2,
      label: "Parceiros",
      component: <ParceirosSummary pedidos={pedidos} />,
    },
    {
      id: 3,
      label: "Pedidos",
      component: (
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
      ),
    },
  ];

  // Função para navegação com controle de direção
  const goToSlide = (index: number) => {
    setTransitionDirection(index > currentSlide ? "left" : "right");
    setCurrentSlide(index);
  };

  // Estados de carregamento
  if (loading && pedidos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-2">
        <LoadingSpinner size="lg" />
        <p className="text-gray-600">Carregando dados...</p>
      </div>
    );
  }

  // Tratamento de erros
  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Alert type="error" message={error} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Sumário</h1>

      {/* Barra de navegação */}
      <div className="flex justify-between gap-2 mb-4">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`flex-1 py-3 rounded-lg transition-all duration-300 ${
              currentSlide === index
                ? "bg-blue-600 text-white font-medium shadow-md"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            aria-label={`Mostrar ${slide.label}`}
            aria-current={currentSlide === index ? "page" : undefined}
          >
            {slide.label}
          </button>
        ))}
      </div>

      {/* Carrossel de slides com transição suave */}
      <div className="relative overflow-hidden rounded-lg shadow-lg min-h-[500px] bg-white">
        <div
          className={`flex transition-transform duration-500 ease-in-out ${
            transitionDirection === "left" ? "slide-in-left" : "slide-in-right"
          }`}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="w-full flex-shrink-0 p-4">
              {slide.component}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PedidoList;
