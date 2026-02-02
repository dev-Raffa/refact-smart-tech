import { Button } from "@/components/ui/button";
import { LoaderIcon, RefreshCcwIcon } from "lucide-react";
import { useState } from "react";

export function UpdateDailyOperation() {
  const [isLoading ] = useState(false);

  async function handleUpdateDailyOperation() {
    console.log("Starting daily operation update...");
  }

  return (
    <Button
      type="button"
      className="h-9 w-full sm:w-auto"
      disabled={isLoading}
      onClick={handleUpdateDailyOperation}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          Atualizando
          <LoaderIcon className="size-4 animate-spin" />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <RefreshCcwIcon className="hidden 2xl:flex size-4" />
          Atualizar Operação
        </div>
      )}
    </Button >
  )
}