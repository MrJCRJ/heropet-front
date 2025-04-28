import { useState } from "react";
import { mockProducts } from "../mockData";
import ProductCard from "../ProductCard";
import PaginationControls from "../PaginationControls";

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

      {/* Alterado para grid de 2 colunas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default StockHistory;
