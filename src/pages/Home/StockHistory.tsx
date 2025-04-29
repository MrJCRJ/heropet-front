// File: src/pages/Home/StockHistory/index.tsx
import { useState, useEffect } from "react";
import { mockProducts } from "./mockData";
import ProductCard from "./ProductCard";
import PaginationControls from "./PaginationControls";
import { MockProduct } from "./mockData";

const StockHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<MockProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = 2;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const loadedProducts = await mockProducts;
        setProducts(loadedProducts);
      } catch (err) {
        setError("Falha ao carregar dados de estoque");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Carregando dados...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">Nenhum dado de estoque disponível</div>
    );
  }

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white rounded-lg p-6 mb-8 shadow-md">
      <h2 className="text-gray-800 text-xl md:text-2xl mb-6 pb-3 border-b border-gray-100">
        Evolução de Estoque
      </h2>

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
