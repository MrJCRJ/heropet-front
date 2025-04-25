import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
        <Link to="/" className={`${styles.button} ${styles.backButton}`}>
          Voltar
        </Link>
        <h1>Fornecedores</h1>
        <div className={styles.actions}>
          <Link
            to="/pedidos"
            className={`${styles.button} ${styles.pedidosButton}`}
          >
            Ver Pedidos
          </Link>
          <Link
            to="/catalogo"
            className={`${styles.button} ${styles.catalogButton}`}
          >
            Catálogo de Produtos (em construção)
          </Link>
          <Link
            to="/fornecedores/novo"
            className={`${styles.button} ${styles.addButton}`}
          >
            Adicionar Fornecedor
          </Link>
        </div>
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
