import React, { useState, useEffect } from "react";
import { Pedido, ItemPedido } from "../../types/pedidos";
import { EstoqueHistorico } from "../../types/estoque";
import { getHistoricoEstoque } from "../../api/estoque";
import { ProductDropdown } from "./ProductDropdown";
import { ItemsTable } from "./ItemsTable";

interface FormItemsProps {
  formData: Omit<Pedido, "_id">;
  setFormData: React.Dispatch<React.SetStateAction<Omit<Pedido, "_id">>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  hasParcelamento: boolean;
  setHasParcelamento: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FormItems = ({
  formData,
  setFormData,
  setError,
  hasParcelamento,
  setHasParcelamento,
}: FormItemsProps) => {
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

  const getEstoqueDisponivel = (produtoNome: string) => {
    const produto = estoque.find(
      (p) => p.nome.toLowerCase() === produtoNome.toLowerCase()
    );
    return produto ? produto.estoqueAtual : 0;
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

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Itens do Pedido</h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Produto
          </label>
          <ProductDropdown
            mostrarDropdown={mostrarDropdown}
            termoBusca={termoBusca}
            estoqueFiltrado={estoqueFiltrado}
            produtoNaoEncontrado={produtoNaoEncontrado}
            toggleDropdown={toggleDropdown}
            handleInputChange={handleInputChange}
            selecionarProduto={selecionarProduto}
            usarProdutoDigitado={usarProdutoDigitado}
          />
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
          <ItemsTable
            items={formData.itens}
            removerItem={removerItem}
            totalPedido={formData.totalPedido}
          />
          {/* Adicionando a opção de parcelamento */}
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="parcelamento"
              checked={hasParcelamento}
              onChange={(e) => setHasParcelamento(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="parcelamento"
              className="ml-2 block text-sm text-gray-900"
            >
              Este pedido terá parcelamento
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
