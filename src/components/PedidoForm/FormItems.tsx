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
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const [termoBusca, setTermoBusca] = useState("");
  const [estoqueFiltrado, setEstoqueFiltrado] = useState<EstoqueHistorico[]>(
    []
  );
  const [produtoNaoEncontrado, setProdutoNaoEncontrado] = useState(false);

  useEffect(() => {
    const carregarEstoque = async () => {
      try {
        const estoqueData = await getHistoricoEstoque();
        setEstoque(estoqueData);
        setEstoqueFiltrado(estoqueData);
      } catch (error) {
        console.error("Erro ao carregar estoque:", error);
        setError("Erro ao carregar lista de produtos do estoque");
      }
    };
    carregarEstoque();
  }, [setError]);

  useEffect(() => {
    if (termoBusca) {
      const filtrados = estoque.filter((produto) =>
        produto.nome.toLowerCase().includes(termoBusca.toLowerCase())
      );
      setEstoqueFiltrado(filtrados);
      setProdutoNaoEncontrado(filtrados.length === 0);
    } else {
      setEstoqueFiltrado(estoque);
      setProdutoNaoEncontrado(false);
    }
  }, [termoBusca, estoque]);

  const toggleDropdown = () => {
    setMostrarDropdown(!mostrarDropdown);
    if (!mostrarDropdown) {
      setTermoBusca("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermoBusca(e.target.value);
    if (!mostrarDropdown) {
      setMostrarDropdown(true);
    }
  };

  const selecionarProduto = (produto: EstoqueHistorico) => {
    setNovoItem({
      produto: produto.nome,
      quantidade: 1,
      precoUnitario: produto.estoqueAtual > 0 ? 0.01 : 0,
    });
    setMostrarDropdown(false);
    setTermoBusca("");
    setProdutoNaoEncontrado(false);
  };

  const usarProdutoDigitado = () => {
    setNovoItem({
      produto: termoBusca,
      quantidade: 1,
      precoUnitario: 0.01,
    });
    setMostrarDropdown(false);
    setTermoBusca("");
  };

  const handleQuantidadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNovoItem({
      ...novoItem,
      quantidade: parseFloat(e.target.value) || 0,
    });
  };

  const handlePrecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNovoItem({
      ...novoItem,
      precoUnitario: parseFloat(e.target.value) || 0,
    });
  };

  const adicionarItem = () => {
    if (!novoItem.produto.trim()) {
      setError("Por favor, informe um produto");
      return;
    }

    const produtoEstoque = estoque.find(
      (p) => p.nome.toLowerCase() === novoItem.produto.toLowerCase()
    );

    if (novoItem.quantidade <= 0 || novoItem.precoUnitario <= 0) {
      setError("Quantidade e preço devem ser maiores que zero");
      return;
    }

    // Verificação de estoque só se for venda e o produto existir no estoque
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
      produto: novoItem.produto,
      quantidade: novoItem.quantidade,
      precoUnitario: novoItem.precoUnitario,
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
    const produto = estoque.find(
      (p) => p.nome.toLowerCase() === produtoNome.toLowerCase()
    );
    return produto ? produto.estoqueAtual : 0;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Itens do Pedido</h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="space-y-1 relative">
          <label className="block text-sm font-medium text-gray-700">
            Produto
          </label>
          <div className="relative">
            <div
              className="flex items-center justify-between cursor-pointer bg-white border border-gray-300 rounded-md px-3 py-2 shadow-sm"
              onClick={toggleDropdown}
            >
              {mostrarDropdown ? (
                <input
                  type="text"
                  className="w-full outline-none"
                  value={termoBusca}
                  onChange={handleInputChange}
                  autoFocus
                  placeholder="Digite para buscar..."
                />
              ) : (
                <span className="truncate">
                  {novoItem.produto || "Selecione um produto"}
                </span>
              )}
              <svg
                className={`h-5 w-5 text-gray-400 transition-transform ${
                  mostrarDropdown ? "transform rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {mostrarDropdown && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                {estoqueFiltrado.length > 0 ? (
                  estoqueFiltrado.map((produto) => (
                    <div
                      key={produto.produtoId}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => selecionarProduto(produto)}
                    >
                      {produto.nome} ({produto.estoqueAtual})
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">
                    Nenhum produto encontrado
                  </div>
                )}

                {produtoNaoEncontrado && termoBusca && (
                  <div className="border-t border-gray-200">
                    <div
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-blue-600"
                      onClick={usarProdutoDigitado}
                    >
                      Adicionar "{termoBusca}" como novo produto
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Quantidade
          </label>
          <input
            type="number"
            name="quantidade"
            value={novoItem.quantidade}
            onChange={handleQuantidadeChange}
            min="1"
            step="1"
            max={
              formData.tipo === "VENDA" &&
              estoque.some(
                (p) => p.nome.toLowerCase() === novoItem.produto.toLowerCase()
              )
                ? getEstoqueDisponivel(novoItem.produto)
                : undefined
            }
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {novoItem.produto &&
            formData.tipo === "VENDA" &&
            estoque.some(
              (p) => p.nome.toLowerCase() === novoItem.produto.toLowerCase()
            ) && (
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
            onChange={handlePrecoChange}
            min="0.01"
            step="0.01"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          type="button"
          onClick={adicionarItem}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
          disabled={!novoItem.produto.trim()}
        >
          Adicionar Item
        </button>
      </div>

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
