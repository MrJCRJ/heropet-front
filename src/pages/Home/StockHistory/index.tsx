import { useState } from "react";
import { MockProduct, mockProducts } from "../mockData";

const StockHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(mockProducts.length / itemsPerPage);
  const currentProducts = mockProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white rounded-lg p-6 mb-8 shadow-md">
      <h2 className="text-gray-800 text-xl md:text-2xl mb-6 pb-3 border-b border-gray-100">
        Evolução de Estoque (Últimos 12 Meses) - Informações apenas para test
      </h2>

      <div className="grid grid-cols-1 gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Anterior
          </button>
          <span className="flex items-center px-4">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
};

const ProductCard = ({ product }: { product: MockProduct }) => {
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    content: string;
    x: number;
    y: number;
  }>({ visible: false, content: "", x: 0, y: 0 });

  const currentStock =
    product.monthlyStocks[product.monthlyStocks.length - 1].stock;
  const initialStock = product.initialStock;
  const variation = currentStock - initialStock;

  const handleMouseEnter = (
    month: (typeof product.monthlyStocks)[0],
    index: number,
    e: React.MouseEvent
  ) => {
    const prevMonth =
      index > 0 ? product.monthlyStocks[index - 1].stock : month.stock;
    const diff = month.stock - prevMonth;
    const totalMovement = month.purchases + month.sales;
    const purchasePercentage =
      totalMovement > 0 ? (month.purchases / totalMovement) * 100 : 0;
    const salesPercentage =
      totalMovement > 0 ? (month.sales / totalMovement) * 100 : 0;

    setTooltip({
      visible: true,
      content: `
        Mês: ${new Date(2000, month.month - 1, 1).toLocaleString("default", {
          month: "long",
        })}/${month.year}
        Estoque Final: ${month.stock}
        ${diff > 0 ? `Comprou: +${diff}` : `Vendeu: ${diff}`}
        Compras: +${month.purchases} (${purchasePercentage.toFixed(1)}%)
        Vendas: -${month.sales} (${salesPercentage.toFixed(1)}%)
        Variação: ${month.purchases - month.sales > 0 ? "+" : ""}${
        month.purchases - month.sales
      }
      `,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, content: "", x: 0, y: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltip((prev) => ({ ...prev, x: e.clientX, y: e.clientY }));
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="m-0 text-gray-800 text-lg">{product.name}</h3>
        <span className="block text-gray-600 text-sm">{product.brand}</span>
      </div>

      <div className="flex justify-between mb-6">
        <div className="text-center">
          <span className="block text-gray-600 text-sm">Estoque Atual</span>
          <strong className="text-gray-800 text-2xl md:text-3xl">
            {currentStock}
          </strong>
        </div>
        <div
          className={`text-center p-2 rounded-md flex flex-col justify-center ${
            variation >= 0
              ? "bg-green-50 text-green-600"
              : "bg-red-50 text-red-600"
          }`}
        >
          <span className="font-bold text-lg">
            {variation >= 0 ? "+" : ""}
            {variation}
          </span>
          <span className="text-xs opacity-80">desde o início</span>
        </div>
      </div>

      <div className="flex h-[150px] items-end gap-2">
        {product.monthlyStocks.map((month, index) => {
          const prevMonth =
            index > 0 ? product.monthlyStocks[index - 1].stock : month.stock;
          const diff = month.stock - prevMonth;
          const totalMovement = month.purchases + month.sales;
          const purchasePercentage =
            totalMovement > 0 ? (month.purchases / totalMovement) * 100 : 0;
          const salesPercentage =
            totalMovement > 0 ? (month.sales / totalMovement) * 100 : 0;

          return (
            <div
              key={index}
              className="flex-1 flex flex-col items-center h-full relative cursor-pointer"
              onMouseEnter={(e) => handleMouseEnter(month, index, e)}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            >
              <div className="text-gray-600 text-xs mb-2">
                {new Date(2000, month.month - 1, 1).toLocaleString("default", {
                  month: "short",
                })}
              </div>
              <div className="flex-1 w-5 flex flex-col-reverse relative">
                {/* Combined bar visualization */}
                {diff > 0 && (
                  <div
                    className="w-full absolute bottom-0 bg-green-500 transition-all duration-300 ease-in-out hover:opacity-90"
                    style={{ height: `${purchasePercentage}%` }}
                  ></div>
                )}
                {diff < 0 && (
                  <div
                    className="w-full absolute bottom-0 bg-red-500 transition-all duration-300 ease-in-out hover:opacity-90"
                    style={{ height: `${salesPercentage}%` }}
                  ></div>
                )}
                <div
                  className="w-full bg-blue-500 opacity-70 transition-all duration-300 ease-in-out hover:opacity-90"
                  style={{
                    height: `${
                      (prevMonth / (prevMonth + Math.abs(diff))) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {tooltip.visible && (
        <div
          className="fixed bg-gray-800 text-white p-3 rounded-md text-sm z-50 pointer-events-none shadow-lg max-w-[200px] leading-6"
          style={{
            left: `${tooltip.x + 10}px`,
            top: `${tooltip.y + 10}px`,
          }}
        >
          {tooltip.content.split("\n").map((line, i) => (
            <div key={i} className="whitespace-nowrap">
              {line.trim()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StockHistory;
