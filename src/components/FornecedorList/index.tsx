import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { type Fornecedor } from "../../api/fornecedores";
import { useState } from "react";

interface FornecedorListProps {
  fornecedores: Fornecedor[];
  isLoading?: boolean;
  error?: string | null;
  onDelete?: (cnpj: string) => void;
}

const FornecedorList = ({
  fornecedores,
  isLoading = false,
  error = null,
  onDelete,
}: FornecedorListProps) => {
  const [deleting, setDeleting] = useState<string | null>(null);
  if (isLoading)
    return <div className={styles.loading}>Carregando fornecedores...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (fornecedores.length === 0)
    return <div className={styles.empty}>Nenhum fornecedor cadastrado</div>;

  const handleDelete = async (cnpj: string) => {
    if (window.confirm("Tem certeza que deseja excluir este fornecedor?")) {
      setDeleting(cnpj);
      try {
        if (onDelete) {
          await onDelete(cnpj);
        }
      } finally {
        setDeleting(null);
      }
    }
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>CNPJ</th>
            <th>Nome</th>
            <th>Nome Fantasia</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.map((fornecedor) => (
            <tr key={fornecedor.cnpj}>
              <td>{fornecedor.cnpj}</td>
              <td>{fornecedor.nome}</td>
              <td>{fornecedor.nomeFantasia}</td>
              <td>{fornecedor.email}</td>
              <td>{fornecedor.telefone}</td>
              <td className={styles.actions}>
                <Link
                  to={`/fornecedores/${fornecedor.cnpj}`}
                  className={styles.viewButton}
                >
                  Ver
                </Link>
                <Link
                  to={`/fornecedores/${fornecedor.cnpj}/editar`}
                  className={styles.editButton}
                >
                  Editar
                </Link>
                {onDelete && (
                  <button
                    onClick={() => handleDelete(fornecedor.cnpj)}
                    className={styles.deleteButton}
                    disabled={deleting === fornecedor.cnpj}
                  >
                    {deleting === fornecedor.cnpj ? (
                      <span className={styles.deletingText}>Excluindo...</span>
                    ) : (
                      "Excluir"
                    )}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FornecedorList;
