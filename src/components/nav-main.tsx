import { type LucideIcon } from "lucide-react"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { NavLink } from "react-router"
//import { NavLink } from "react-router"
//import { RestrictedLink } from "./shared/restricted-link"


type NavItems = {
  title: string,
  url: string,
  icon?: LucideIcon,
  isActive?: boolean,
  isRestricted?: boolean,
}

export function NavMain({
  items,
}: {
  items: NavItems[]
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <NavLink
            key={`${item.title}-${item.url}`}
            to={item.url}
            className={({ isActive }) => `relative h-full  py-1.5 cursor-pointer transition-colors duration-20  flex items-center overflow-hidden outline-none select-none text-foreground hover:text-red-500 ${isActive ? ' text-red-500' : ''}`}
          >
            <SidebarMenuButton tooltip={item.title}>
              {item.icon && (
                <div className="size-5 shrink-0 flex items-center justify-center">
                  <item.icon className="size-5" />
                </div>
              )}
              <span className="ml-2 text-sm font-medium leading-5 whitespace-nowrap tracking-wide">{item.title}</span>
              <span className="sr-only">{item.title}</span>
            </SidebarMenuButton>
          </NavLink>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
