import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarFornecedor, type Endereco } from "../../../api/fornecedores";
import FornecedorForm from "../../../components/FornecedorForm";

const FornecedorCreate = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: {
    cnpj: string;
    nome?: string;
    nomeFantasia?: string;
    email?: string;
    telefone?: string;
    endereco?: Endereco;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      await criarFornecedor(formData);
      navigate("/fornecedores");
    } catch (err) {
      setError("Erro ao criar fornecedor");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FornecedorForm
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default FornecedorCreate;
