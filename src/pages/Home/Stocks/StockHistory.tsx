import { useState, useEffect } from "react";
import { mockProducts } from "../Dados/mockData";
import { Product } from "../type/types";
import ProductCard from "./ProductCard";

const StockHistory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="bg-white rounded-lg p-6 mb-8 shadow-md">
      <h2 className="text-gray-800 text-xl md:text-2xl mb-6 pb-3 border-b border-gray-100">
        Gerenciamento do Estoque
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default StockHistory;
