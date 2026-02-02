import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { LogOut } from "lucide-react"

export function Logout() {

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="size-full flex items-center gap-2 bg-transparent border-none cursor-pointer text-inherit p-0"
          onClick={(e) => e.stopPropagation()}
        >
          <LogOut className="size-4" />
          Encerrar sessão
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja encerrar a sessão atual?</AlertDialogTitle>
          <AlertDialogDescription>
            Após esta ação, você será deslogado do sistema e redirecionado para
            se autenticar novamente.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel >Cancelar</AlertDialogCancel>

          <AlertDialogAction
            className="bg-destructive dark:text-foreground dark:hover:text-destructive"
            
          >
            Encerrar sessão
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
