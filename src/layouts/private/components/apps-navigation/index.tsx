import { Button } from "@/components/ui/button";
import { BookText, ChartNoAxesColumnIcon, LayoutDashboard, Search } from "lucide-react";

const apps = [
  {
    name: "CRM",
    description: "Sistema de gestão de relacionamento",
    icon: <ChartNoAxesColumnIcon className="size-4" />,
    href: `https://crm.gruposmartconsig.com.br`,
    active: false,
  },
  {
    name: "Simulações",
    description: "Sistema de simulações",
    icon: <Search className="size-4" />,
    href: `https://simulacoes.gruposmartconsig.com.br`,
    active: false,
  },
  {
    name: "Administração",
    description: "Sistema de administração",
    icon: <LayoutDashboard className="size-5" />,
    href: `https://admin.gruposmartconsig.com.br`,
    active: true,
  },
  {
    name: "Formalização",
    description: "Sistema de formalização",
    icon: <BookText className="size-4" />,
    href: `https://formalizacao.gruposmartconsig.com.br`,
    active: false,
  }
];

export const AppsNavigation = () => {
  // Nota: O hook de path não está sendo usado na lógica abaixo, 
  // mantive a estrutura baseada na propriedade 'active' do objeto apps conforme seu código.

  return (
    <ul className="flex gap-2 bg-white p-1 rounded-full shadow-sm">
      {apps.map((app) => (
        <li key={app.name}>
          <a
            href={app.active ? app.href : '#'}
            target={app.active ? "_blank" : undefined}
            rel={app.active ? "noopener noreferrer" : undefined}
            // 1. Adicionamos 'group' aqui para que o hover no <a> afete o texto filho
            // 2. Removemos w-9.5 e w-fit. Deixamos o flex controlar o tamanho.
            className={`
              group flex items-center h-full cursor-pointer p-1 rounded-full bg-zinc-50 
              transition-all duration-500 ease-in-out border border-transparent
              ${app.active 
                ? 'bg-zinc-100 text-red-500 hover:bg-zinc-200' 
                : 'hover:bg-zinc-100 hover:text-red-500'}
            `}
          >
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-full shrink-0" // shrink-0 impede que o ícone esmague
            >
              {app.icon}
            </Button>

            {/* A MÁGICA ACONTECE AQUI */}
            <div 
              className={`
                overflow-hidden transition-all duration-500 ease-in-out
                flex flex-col justify-center
                ${app.active 
                  ? 'max-w-[200px] opacity-100' // Se ativo, já mostra aberto
                  : 'max-w-0 opacity-0 group-hover:max-w-[200px] group-hover:opacity-100'} // Se inativo, anima de 0 a 200px
              `}
            >
              {/* whitespace-nowrap impede que o texto quebre linha enquanto anima */}
              <h3 className="font-semibold text-sm whitespace-nowrap pr-3 pl-1">
                {app.name}
              </h3>
            </div>
          </a>
        </li>
      ))}
    </ul>
  )
}