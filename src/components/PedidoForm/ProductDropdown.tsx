import React from "react";
import { EstoqueHistorico } from "../../types/estoque";

interface ProductDropdownProps {
  mostrarDropdown: boolean;
  termoBusca: string;
  estoqueFiltrado: EstoqueHistorico[];
  produtoNaoEncontrado: boolean;
  toggleDropdown: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selecionarProduto: (produto: EstoqueHistorico) => void;
  usarProdutoDigitado: () => void;
}

export const ProductDropdown = ({
  mostrarDropdown,
  termoBusca,
  estoqueFiltrado,
  produtoNaoEncontrado,
  toggleDropdown,
  handleInputChange,
  selecionarProduto,
  usarProdutoDigitado,
}: ProductDropdownProps) => (
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
        <span className="truncate">{termoBusca || "Selecione um produto"}</span>
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
);
