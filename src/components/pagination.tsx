"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
}

export function Pagination({ currentPage, totalPages, onPageChange, itemsPerPage, totalItems }: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      // Mostrar todas las páginas si son pocas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Siempre mostrar primera página
      pages.push(1);

      if (currentPage <= 3) {
        // Primeras páginas
        for (let i = 2; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Últimas páginas
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Páginas intermedias
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Controles de paginación */}
      {/* Botón Anterior */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 glass-input border-0 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 ${
          currentPage === 1
            ? "text-adaptive-tertiary cursor-not-allowed opacity-50"
            : "hover-button"
        }`}
      >
        Anterior
      </button>

      {/* Números de página */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-adaptive-tertiary">
                ...
              </span>
            );
          }

          const pageNum = page as number;
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`w-10 h-10 glass-input border-0 transition-colors font-medium flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/20 ${
                currentPage === pageNum
                  ? "bg-white/20 backdrop-blur-sm text-adaptive-primary border border-white/30"
                  : "hover-button"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Botón Siguiente */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 glass-input border-0 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 ${
          currentPage === totalPages
            ? "text-adaptive-tertiary cursor-not-allowed opacity-50"
            : "hover-button"
        }`}
      >
        Siguiente
      </button>
    </div>
  );
}

