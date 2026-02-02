import { NotificationsProvider } from "@/hooks/notifications-context"
import { Notifications } from "./notifications"
import { UserMenu } from "./user-menu"
import { ToggleTheme } from "@/theme/toggle-theme"

export function HeaderMenu() {
  return (
    <div className="flex items-center space-x-3">
      <NotificationsProvider>
      <Notifications />
      <ToggleTheme />
      <UserMenu />
      </NotificationsProvider>
    </div>
  )
}