import { Button } from "@/components/ui/button";
import { BookText, ChartNoAxesColumnIcon, LayoutDashboard, Search } from "lucide-react";

const apps = [
  {
    name: "CRM",
    description: "Sistema de gestão de relacionamento",
    icon: <ChartNoAxesColumnIcon className="size-4" />,
    href: `https://crm.gruposmartconsig.com.br`,
    active: true,
  },
  {
    name: "Simulações",
    description: "Sistema de simulações",
    icon: <Search className="size-4" />,
    href: `https://simulacoes.gruposmartconsig.com.br`,
    active: true,
  },
  {
    name: "Administração",
    description: "Sistema de administração",
    icon: <LayoutDashboard className="size-5" />,
    href:`https://admin.gruposmartconsig.com.br`,
    active: false,
  },
  {
    name: "Formalização",
    description: "Sistema de formalização",
    icon: <BookText className="size-4" />, 
    href: `https://formalizacao.gruposmartconsig.com.br`,
    active: true,
  }
];

export const AppsNavigation = () => {
    const path = window.location.pathname;
    console.log('Current path:', path);

  return (
    <ul className="flex gap-2 bg-white p-1 rounded-full shadow-sm">
        {apps.map((app) => (
            <li key={app.name}>
                <a
                    href={app.active ? app.href : '#'}
                    className={`flex gap-1 h-full cursor-pointer px-1 w-9.5 py-0.5 overflow-hidden items-center rounded-full hover:bg-zinc-100 hover:text-red-500 transition-all duration-300 hover:w-fit ${!app.active ? ' text-red-500 w-fit bg-zinc-100' : ''}`}
                    target={app.active ? "_blank" : undefined}
                    rel={app.active ? "noopener noreferrer" : undefined}
                >
                    <Button 
                      variant="ghost"
                      size="icon"
                      className="size-8 rounded-full">
                        {app.icon}
                    </Button>
                    <div className="pr-2">
                        <h3 className="font-semibold text-sm">{app.name}</h3>
                    </div>
                </a>
            </li>
        ))}
    </ul>
  )
}