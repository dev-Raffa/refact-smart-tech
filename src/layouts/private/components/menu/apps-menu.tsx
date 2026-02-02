import { LayoutGrid, ChartNoAxesColumnIcon, Search, BookText, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const apps = [
  {
    name: "CRM",
    description: "Sistema de gestão de relacionamento",
    icon: <ChartNoAxesColumnIcon className="size-4" />,
    href: `https://crm.gruposmartconsig.com.br`,
    isAvaillable: true,
  },
  {
    name: "Simulações",
    description: "Sistema de simulações",
    icon: <Search className="size-4" />,
    href: `https://simulacoes.gruposmartconsig.com.br`,
    isAvaillable: true,
  },
  {
    name: "Administração",
    description: "Sistema de administração",
    icon: <LayoutDashboard className="size-4" />,
    href:`https://admin.gruposmartconsig.com.br`,
    isAvaillable: false,
  },
  {
    name: "Formalização",
    description: "Sistema de formalização",
    icon: <BookText className="size-4" />, 
    href: `https://formalizacao.gruposmartconsig.com.br`,
    isAvaillable: true,
  }
];

export function AppsMenu() {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="size-8 rounded-full"
        >
          <LayoutGrid className="size-[18px]" />
          <span className="sr-only">Abrir menu de aplicativos</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-52 p-2">
        {apps.map((app) => app.isAvaillable && (
          <DropdownMenuItem key={app.name} asChild>
            <a
              href={`${app.href}/authorize/sso?token=`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center h-16 items-center gap-3 cursor-pointer p-3"
            >
              <div >{app.icon}</div>
              <div className="flex flex-col">
                <span className="font-medium">{app.name}</span>
                <span className="text-xs text-muted-foreground">
                  {app.description}
                </span>
              </div>
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
