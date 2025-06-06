import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useLanguage } from "@/app/_contexts/LanguageContext";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
}: PaginationProps) {
  const { t } = useLanguage();
  if (totalPages <= 1) return null; // No need to show pagination if there's only one page

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const getPaginationRange = () => {
    const range: (number | string)[] = [];
    const delta = 2; // Number of pages to show around the current page

    // Always show the first page
    range.push(1);

    // Add ellipsis if needed before the current range
    if (currentPage - delta > 2) {
      range.push("...");
    }

    // Add pages around the current page
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    // Add ellipsis if needed after the current range
    if (currentPage + delta < totalPages - 1) {
      range.push("...");
    }

    // Always show the last page
    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
  };

  const paginationRange = getPaginationRange();
  return (
    <div
      className={`bg-white-50 flex items-center divide-x-2 rounded-lg font-semibold ${disabled ? "pointer-events-none opacity-50" : ""}`}
    >
      <button
        className={`flex h-12 w-12 items-center justify-center px-4 py-2 ${
          currentPage === 1 ? "disabled" : ""
        } rounded-l-md bg-primary-500 hover:bg-gray-400`}
        onClick={handlePreviousPage}
        disabled={currentPage === 1 || disabled}
        aria-label={t("pagination.previous")}
      >
        <FaChevronLeft className="h-4 w-4 text-white" />
      </button>
      {paginationRange.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            className={`flex h-12 w-12 items-center justify-center px-4 py-2 ${
              currentPage === page
                ? "bg-primary-default text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => handlePageChange(page)}
            disabled={disabled}
            aria-label={t("pagination.page").replace("{page}", page.toString())}
          >
            {page}
          </button>
        ) : (
          <span
            key={index}
            className="flex h-12 w-12 items-center justify-center px-2 text-gray-500"
          >
            {page}
          </span>
        ),
      )}
      <button
        className={`flex h-12 w-12 items-center justify-center px-4 py-2 ${
          currentPage === totalPages ? "disabled" : ""
        } rounded-r-md bg-primary-default hover:bg-gray-400`}
        onClick={handleNextPage}
        disabled={currentPage === totalPages || disabled}
        aria-label={t("pagination.next")}
      >
        <FaChevronRight className="h-4 w-4 text-white" />
      </button>
    </div>
  );
}
