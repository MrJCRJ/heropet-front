import { useState, useEffect } from "react";
import { Pedido, ItemPedido } from "../../pages/Home/types/pedidos";
import { EstoqueHistorico, getHistoricoEstoque } from "../../api/estoque";

interface FormItemsProps {
  formData: Omit<Pedido, "_id">;
  setFormData: React.Dispatch<React.SetStateAction<Omit<Pedido, "_id">>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const FormItems = ({ formData, setFormData, setError }: FormItemsProps) => {
  const [estoque, setEstoque] = useState<EstoqueHistorico[]>([]);
  const [novoItem, setNovoItem] = useState<
    Omit<ItemPedido, "total"> & { produto: string }
  >({
    produto: "",
    quantidade: 1,
    precoUnitario: 0.01,
  });

  useEffect(() => {
    const carregarEstoque = async () => {
      try {
        const estoqueData = await getHistoricoEstoque();
        setEstoque(estoqueData);
      } catch (error) {
        console.error("Erro ao carregar estoque:", error);
        setError("Erro ao carregar lista de produtos do estoque");
      }
    };
    carregarEstoque();
  }, [setError]); // Adicionei setError como dependência

  const handleItemChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "produto") {
      const produtoSelecionado = estoque.find((p) => p.nome === value);
      setNovoItem({
        ...novoItem,
        produto: value,
        precoUnitario: produtoSelecionado
          ? produtoSelecionado.estoqueAtual > 0
            ? 0.01
            : 0
          : 0.01,
      });
    } else {
      setNovoItem({
        ...novoItem,
        [name]:
          name === "quantidade" || name === "precoUnitario"
            ? parseFloat(value) || 0
            : value,
      });
    }
  };

  const adicionarItem = () => {
    if (!novoItem.produto.trim()) {
      setError("Por favor, selecione um produto");
      return;
    }

    if (novoItem.quantidade <= 0 || novoItem.precoUnitario <= 0) {
      setError("Quantidade e preço devem ser maiores que zero");
      return;
    }

    const produtoEstoque = estoque.find((p) => p.nome === novoItem.produto);
    if (
      produtoEstoque &&
      produtoEstoque.estoqueAtual < novoItem.quantidade &&
      formData.tipo === "VENDA"
    ) {
      setError(
        `Quantidade indisponível em estoque (disponível: ${produtoEstoque.estoqueAtual})`
      );
      return;
    }

    const itemComTotal: ItemPedido = {
      ...novoItem,
      total: novoItem.quantidade * novoItem.precoUnitario,
    };

    setFormData({
      ...formData,
      itens: [...formData.itens, itemComTotal],
      totalPedido: formData.totalPedido + itemComTotal.total,
    });

    setNovoItem({
      produto: "",
      quantidade: 1,
      precoUnitario: 0.01,
    });
    setError("");
  };

  const removerItem = (index: number) => {
    const itemRemovido = formData.itens[index];
    setFormData({
      ...formData,
      itens: formData.itens.filter((_, i) => i !== index),
      totalPedido: formData.totalPedido - itemRemovido.total,
    });
  };

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const getEstoqueDisponivel = (produtoNome: string) => {
    const produto = estoque.find((p) => p.nome === produtoNome);
    return produto ? produto.estoqueAtual : 0;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Itens do Pedido</h3>

      {/* Formulário para adicionar novo item */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Produto
          </label>
          <select
            name="produto"
            value={novoItem.produto}
            onChange={handleItemChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione um produto</option>
            {estoque.map((produto) => (
              <option key={produto.produtoId} value={produto.nome}>
                {produto.nome} ({produto.estoqueAtual})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Quantidade
          </label>
          <input
            type="number"
            name="quantidade"
            value={novoItem.quantidade}
            onChange={handleItemChange}
            min="1"
            step="1"
            max={
              formData.tipo === "VENDA" && novoItem.produto
                ? getEstoqueDisponivel(novoItem.produto)
                : undefined
            }
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {novoItem.produto && formData.tipo === "VENDA" && (
            <p className="text-xs text-gray-500">
              Disponível: {getEstoqueDisponivel(novoItem.produto)}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Preço Unitário
          </label>
          <input
            type="number"
            name="precoUnitario"
            value={novoItem.precoUnitario}
            onChange={handleItemChange}
            min="0.01"
            step="0.01"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          type="button"
          onClick={adicionarItem}
          disabled={
            !novoItem.produto.trim() ||
            novoItem.quantidade <= 0 ||
            novoItem.precoUnitario <= 0
          }
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
        >
          Adicionar Item
        </button>
      </div>

      {/* Lista de itens adicionados */}
      {formData.itens.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-md font-medium text-gray-900">
            Itens Adicionados
          </h4>
          <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantidade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preço Unitário
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {formData.itens.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.produto}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.quantidade}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatarMoeda(item.precoUnitario)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatarMoeda(item.total)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <button
                        type="button"
                        onClick={() => removerItem(index)}
                        className="text-red-600 hover:text-red-900 font-medium"
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-4 text-right text-sm font-medium text-gray-500"
                  >
                    <strong>Total do Pedido:</strong>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <strong>{formatarMoeda(formData.totalPedido)}</strong>
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormItems;
