import { useState, useMemo } from "react";

const ITEMS_PER_PAGE = 10;

export function usePagination<T>(items: T[]) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

    const paginatedItems = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        return items.slice(start, end);
    }, [items, currentPage]);

    const goToPage = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    };

    const nextPage = () => goToPage(currentPage + 1);
    const prevPage = () => goToPage(currentPage - 1);
    const resetPage = () => setCurrentPage(1);

    return {
        currentPage,
        totalPages,
        paginatedItems,
        goToPage,
        nextPage,
        prevPage,
        resetPage,
        totalItems: items.length,
        startIndex: (currentPage - 1) * ITEMS_PER_PAGE + 1,
        endIndex: Math.min(currentPage * ITEMS_PER_PAGE, items.length),
    };
}