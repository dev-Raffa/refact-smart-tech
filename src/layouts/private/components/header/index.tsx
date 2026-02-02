import { AppLogo } from "@/components/shared/icons/app-logo";
import { HeaderMenu } from "../menu/menu";
import { AppsNavigation } from "../apps-navigation";

export function Header() {
  return (
    <div className="bg-transparent backdrop-blur-xs sticky top-0 flex flex-col space-y-3 shrink-0 z-10 border-b pb-4 md:border-b-0 md:pb-0">
      <div className="flex justify-between items-center py-3 px-4 pr-6">
        <a href="/" className="pt-1.5 w-28 md:w-48">
          <AppLogo />
        </a>
        <AppsNavigation />
        <HeaderMenu />
      </div>
    </div>
  )
}
