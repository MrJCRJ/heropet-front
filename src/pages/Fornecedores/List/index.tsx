import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  listarFornecedores,
  removerFornecedor,
  type Fornecedor,
} from "../../../api/fornecedores";
import FornecedorList from "../../../components/FornecedorList";
import styles from "./styles.module.css";

const FornecedorListPage = () => {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const carregarFornecedores = async () => {
      try {
        const response = await listarFornecedores();
        setFornecedores(response.data);
      } catch (err) {
        setError("Erro ao carregar fornecedores");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    carregarFornecedores();
  }, []);

  const handleDelete = async (cnpj: string) => {
    if (window.confirm("Tem certeza que deseja excluir este fornecedor?")) {
      try {
        await removerFornecedor(cnpj);
        setFornecedores(fornecedores.filter((f) => f.cnpj !== cnpj));
      } catch (err) {
        setError("Erro ao excluir fornecedor");
        console.error(err);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => navigate("/")} className={styles.backButton}>
          Voltar
        </button>
        <h1>Fornecedores</h1>
        <button
          onClick={() => navigate("/fornecedores/novo")}
          className={styles.addButton}
        >
          Adicionar Fornecedor
        </button>
      </div>

      <FornecedorList
        fornecedores={fornecedores}
        isLoading={isLoading}
        error={error}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default FornecedorListPage;
