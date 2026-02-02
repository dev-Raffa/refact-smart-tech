import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { Eye, GripIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { BankRulesButton } from "../bank-rules/button";
import { UpdateBank } from "../bank-update-form";
import type { BankItem } from "@/pages/banks/types";


interface BanksProps {
  data: BankItem;
  isDraggingActive?: boolean | null;
}

export function Banks({ data, isDraggingActive }: BanksProps) {
  const coefficient = data.bank.coefficients[0];
  return (
    <div
      className={cn(
        "bg-card rounded-md text-card-foreground border p-3 transition-all hover:shadow-sm select-none",
        isDraggingActive === false && "opacity-50",
        isDraggingActive === true && "shadow-md scale-[1.02]"
      )}
    >
      <div className="flex items-center mt-2 justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <Button
            type="button"
            title="Reordenar"
            size="sm"
            variant="ghost"
            className="cursor-grab h-7 w-7 p-0 flex-shrink-0 hover:bg-muted"
          >
            <GripIcon className="size-3.5" />
          </Button>

          <h3 className="leading-tight">{data.bank.name}</h3>
        </div>

        <BankRulesButton bank={data} />
        <UpdateBank bank={data} />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="h-8 w-9" variant="outline">
              <Eye />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-white w-24 dark:bg-primary">
            <Badge className="bg-transparent border border-zinc-200 text-[11px] text-blue-600 font-medium lowercase hover:bg-transparent dark:border-border px-2 py-0.5">
              <span className="bg-blue-600 rounded-full size-1.5 mr-1.5" />
              {data.bank.agreement === "None" ? "None" : data.bank.agreement}
            </Badge>

            <div className="flex items-center gap-1 text-xs">
              <span className="text-muted-foreground">Coef:</span>
              <span className="font-semibold">
                {coefficient === 0 ? `0.${coefficient}` : coefficient}
              </span>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="flex items-center gap-3 mb-3 pl-2"></div>
    </div>
  );
}
