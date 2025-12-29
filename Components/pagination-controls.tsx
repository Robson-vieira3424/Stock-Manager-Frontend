import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    startIndex: number;
    endIndex: number;
    totalItems: number;
    onPrevPage: () => void;
    onNextPage: () => void;
}

export function PaginationControls({
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    totalItems,
    onPrevPage,
    onNextPage,
}: PaginationControlsProps) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-4">
            <p className="text-sm text-muted-foreground">
                Mostrando {startIndex} a {endIndex} de {totalItems} registros
            </p>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onPrevPage}
                    disabled={currentPage === 1}
                    className="gap-1"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Anterior
                </Button>
                <span className="text-sm text-muted-foreground px-2">
                    {currentPage} / {totalPages}
                </span>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onNextPage}
                    disabled={currentPage === totalPages}
                    className="gap-1"
                >
                    Próximo
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}