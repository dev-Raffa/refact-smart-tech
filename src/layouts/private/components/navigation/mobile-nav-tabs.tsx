import type React from "react"
import {
  ChartNoAxesColumnIcon,
  HardDriveUploadIcon,
  Headset,
  HomeIcon,
  LayersIcon,
  LayoutDashboardIcon,
  MenuIcon,
  RocketIcon,
  SearchIcon,
  UserCog,
} from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"
import { useLocation, Link } from "react-router"
import { useState } from "react"

interface TabsProps {
  label: string
  icon: React.ReactNode
  href: string
}

export const tabs: TabsProps[] = [
  {
    label: "Inicio",
    icon: <HomeIcon className="size-4" />,
    href: "/",
  },
  {
    label: "Dashboard",
    icon: <LayoutDashboardIcon className="size-4" />,
    href: "/dashboard",
  },
  {
    label: "Importações",
    icon: <HardDriveUploadIcon className="size-4" />,
    href: "/importar/arquivos",
  },
  {
    label: "Clientes",
    icon: <RocketIcon className="size-4" />,
    href: "/clientes",
  },
  {
    label: "Consultas",
    icon: <SearchIcon className="size-4" />,
    href: "/consultas",
  },
  {
    label: "CRM",
    icon: <ChartNoAxesColumnIcon className="size-4" />,
    href: "/crm",
  },
  {
    label: "Operadores",
    icon: <Headset className="size-4" />,
    href: "/operadores",
  },
  {
    label: "Usuários",
    icon: <UserCog className="size-4" />,
    href: "/gerenciar-usuarios",
  },
  {
    label: "Administrativo",
    icon: <LayersIcon className="size-4" />,
    href: "/administrativo/operacional",
  },
]

export function MobileNavTabs() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const isActiveTab = (tab: TabsProps) => {
    if (tab.href === "/") return location.pathname === tab.href
    return location.pathname.startsWith(tab.href)
  }

  return (
    <div className="block md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-8 rounded-full"
          >
            <MenuIcon className="size-5" />
            <span className="sr-only">Abrir menu de navegação</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80">
          <SheetHeader>
            <SheetTitle>Menu de Navegação</SheetTitle>
          </SheetHeader>
          <div className="mt-6 flex flex-col space-y-2">
            {tabs.map((tab: TabsProps) => (
              <Link
                key={tab.href}
                to={tab.href}
                onClick={() => setOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-lg transition-colors duration-200
                  ${
                    isActiveTab(tab)
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }
                `}
              >
                {tab.icon}
                <span className="text-sm font-medium">{tab.label}</span>
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
