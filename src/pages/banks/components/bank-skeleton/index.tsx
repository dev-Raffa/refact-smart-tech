import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function BanksSkeleton() {
  const placeholders = Array.from({ length: 6 }); // 6 cards, exemplo

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-3">
      {placeholders.map((_, idx) => (
        <Card
          key={idx}
          className="p-3 bg-card rounded-md border text-card-foreground shadow-sm"
        >
          <div className="flex items-center justify-between gap-2">
            {/* Botão de reorder */}
            <Skeleton className="h-7 w-7 rounded cursor-grab" />

            {/* Nome do banco */}
            <Skeleton className="h-6 w-32 flex-1 ml-2" />

            {/* Simulando BankRulesButton */}
            <Skeleton className="h-7 w-10 rounded" />

            {/* Simulando UpdateBank */}
            <Skeleton className="h-7 w-10 rounded" />

            {/* Botão do olho */}
            <Skeleton className="h-8 w-9 rounded" />
          </div>
          {/* Espaço inferior vazio para manter estrutura */}
          <div className="h-6 mt-3"></div>
        </Card>
      ))}
    </div>
  );
}
