import { ShieldAlertIcon } from "lucide-react"

export const AcessDenied = () => {
  return (
    <div className="size-full flex py-56 justify-center">
        <div className="flex flex-col items-center gap-4 text-center max-w-md">
          <ShieldAlertIcon className="size-16 text-destructive" />
          <div>
            <h2 className="text-2xl font-bold mb-2">Acesso Negado</h2>
            <p className="text-muted-foreground">
              Você ainda não possui grupos mapeados.
            </p>
           
          </div>
        </div>
      </div>
  )
}