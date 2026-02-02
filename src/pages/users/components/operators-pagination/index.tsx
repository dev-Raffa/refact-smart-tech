import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface OperatorsTablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalResults: number;
  pageSize: number;
}

export function OperatorsTablePagination({
  currentPage,
  totalPages,
  onPageChange,
  totalResults,
  pageSize,
}: OperatorsTablePaginationProps) {
  return (
    <div className="flex flex-col items-center space-y-6 pt-6 pb-12 sm:flex-row sm:justify-end sm:space-x-2 sm:space-y-0 sm:pl-8 sm:pr-4">
      <div className="max-w-xs text-sm text-muted-foreground sm:max-w-full sm:flex-1 sm:px-2">
        Exibindo {" "}
        <strong>
          {Math.min(totalResults - (currentPage - 1) * pageSize, pageSize)}
        </strong> {" "}
        resultados referente {" "}
        a página <strong>{currentPage}</strong>.
        Total de <strong>{totalPages}</strong> página(s) com {""}
        <strong>{totalResults}</strong> operadore(s) filtrados.
      </div>

      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon className="size-4" />
          Anterior
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Próximo
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
}