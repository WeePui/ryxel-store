import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
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
      range.push('...');
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
      range.push('...');
    }

    // Always show the last page
    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
  };

  const paginationRange = getPaginationRange();

  return (
    <div className="flex items-center rounded-lg font-semibold bg-white-50 divide-x-2">
      <button
        className={`px-4 py-2 h-12 w-12 flex items-center justify-center ${
          currentPage === 1 ? 'disabled' : ''
        } bg-primary-500 hover:bg-gray-400 rounded-l-md`}
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        <FaChevronLeft className="h-4 w-4 text-white" />
      </button>
      {paginationRange.map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            className={`px-4 py-2 h-12 w-12 flex items-center justify-center ${
              currentPage === page
                ? 'bg-primary-default text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ) : (
          <span
            key={index}
            className="px-2 h-12 w-12 flex items-center justify-center text-gray-500"
          >
            {page}
          </span>
        )
      )}
      <button
        className={`px-4 py-2 h-12 w-12 flex items-center justify-center ${
          currentPage === totalPages ? 'disabled' : ''
        } bg-primary-default hover:bg-gray-400 rounded-r-md`}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        <FaChevronRight className="h-4 w-4 text-white" />
      </button>
    </div>
  );
}
