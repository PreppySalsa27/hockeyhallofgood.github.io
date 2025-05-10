import { Button } from "@/components/ui/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingsCount?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingsCount = 1
}: PaginationProps) {
  // Generate page numbers to show
  const generatePaginationItems = () => {
    // Always show first and last page
    const firstPage = 1;
    const lastPage = totalPages;
    
    // Calculate range of pages to show
    const leftSiblingIndex = Math.max(currentPage - siblingsCount, firstPage);
    const rightSiblingIndex = Math.min(
      currentPage + siblingsCount,
      lastPage
    );

    // Determine whether to show ellipses
    const shouldShowLeftDots = leftSiblingIndex > firstPage + 1;
    const shouldShowRightDots = rightSiblingIndex < lastPage - 1;
    
    // Generate the final array of page items
    const items: (number | 'dots')[] = [];
    
    // Always add first page
    items.push(firstPage);
    
    // Add left ellipsis if needed
    if (shouldShowLeftDots) {
      items.push('dots');
    }
    
    // Add pages in the middle
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      if (i !== firstPage && i !== lastPage) {
        items.push(i);
      }
    }
    
    // Add right ellipsis if needed
    if (shouldShowRightDots) {
      items.push('dots');
    }
    
    // Always add last page if there is more than one page
    if (lastPage > firstPage) {
      items.push(lastPage);
    }
    
    return items;
  };

  const paginationItems = generatePaginationItems();

  return (
    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
      <Button
        variant="outline"
        size="sm"
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
      >
        <span className="sr-only">Previous</span>
        <FaChevronLeft className="h-3 w-3" />
      </Button>
      
      {paginationItems.map((item, index) => {
        if (item === 'dots') {
          return (
            <span
              key={`dots-${index}`}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
            >
              ...
            </span>
          );
        }
        
        return (
          <Button
            key={item}
            variant={currentPage === item ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(item)}
            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
              currentPage === item
                ? "bg-primary text-white"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {item}
          </Button>
        );
      })}
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
      >
        <span className="sr-only">Next</span>
        <FaChevronRight className="h-3 w-3" />
      </Button>
    </nav>
  );
}
