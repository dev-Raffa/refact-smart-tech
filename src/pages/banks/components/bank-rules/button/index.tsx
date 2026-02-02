import { Link, useLocation, useSearchParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import type { BankItem } from "@/pages/banks/types";


function formatBankNameForUrl(bankName: string): string {
  return bankName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

export function BankRulesButton({ bank }: { bank: BankItem }) {
  const location = useLocation();
  const [searchParams] = useSearchParams();


  const bankId = bank.id;
  const formattedBankName = formatBankNameForUrl(bank.bank.name);

  const currentParams = new URLSearchParams(searchParams.toString());
  currentParams.set('tab', 'regras-bancarias');
  currentParams.set('banco', formattedBankName);
  currentParams.set('id', bankId);
  currentParams.set('produto', bank.bank.product);

  const href = `${location.pathname}?${currentParams.toString()}`;

  return (
    <Link to={href}>
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="flex items-center gap-2"
      >
        <Settings className="size-4" />
      </Button>
    </Link>
  );
}