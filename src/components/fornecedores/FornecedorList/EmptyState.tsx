// Exemplo EmptyState.tsx
import { Link } from "react-router-dom";

export const EmptyState = () => (
  <div className="py-8 text-center">
    <p className="text-gray-500 italic">Nenhum fornecedor cadastrado</p>
    <Link to="/fornecedores/novo" className="...">
      Cadastrar novo fornecedor
    </Link>
  </div>
);
