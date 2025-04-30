// File: src/pages/Home/PaginationControls.tsx
import { PaginationControlsProps } from "./types";

const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}: PaginationControlsProps) => {
  if (totalPages <= 1) return null;

  // Calcula os números de página visíveis
  const getVisiblePages = () => {
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(currentPage - half, 1);
    const end = Math.min(start + maxVisiblePages - 1, totalPages);

    // Ajusta se estiver no final
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex flex-col items-center mt-6 gap-4">
      <div className="flex items-center gap-1">
        {/* Botão Primeira Página */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-md ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-blue-600 hover:bg-blue-50"
          }`}
          aria-label="Primeira página"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Botão Anterior */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-blue-600 hover:bg-blue-50"
          }`}
          aria-label="Página anterior"
        >
          Anterior
        </button>

        {/* Números de página */}
        {visiblePages[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className={`px-3 py-1 rounded-md ${
                1 === currentPage
                  ? "bg-blue-500 text-white"
                  : "text-blue-600 hover:bg-blue-50"
              }`}
            >
              1
            </button>
            {visiblePages[0] > 2 && <span className="px-2">...</span>}
          </>
        )}

        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-md ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "text-blue-600 hover:bg-blue-50"
            }`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        ))}

        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <span className="px-2">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className={`px-3 py-1 rounded-md ${
                totalPages === currentPage
                  ? "bg-blue-500 text-white"
                  : "text-blue-600 hover:bg-blue-50"
              }`}
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Botão Próxima */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-blue-600 hover:bg-blue-50"
          }`}
          aria-label="Próxima página"
        >
          Próxima
        </button>

        {/* Botão Última Página */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-md ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-blue-600 hover:bg-blue-50"
          }`}
          aria-label="Última página"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;
