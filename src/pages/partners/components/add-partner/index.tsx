import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PartnerForm } from "../partner-form";

export const AddPartner = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button type="button" size="sm" className="w-44 lg:w-auto lg:text-[13px]">
                    Adicionar Parceiro
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Adicionar parceiro</SheetTitle>
                    <SheetDescription className="text-muted-foreground pt-2">
                        Utilize este formulário para registrar uma nova empresa parceira no sistema.
                        É necessário preencher os dados da empresa e, em seguida, definir as credenciais (usuário e senha)
                        para o primeiro administrador dessa conta.
                    </SheetDescription>
                </SheetHeader>
                <PartnerForm />
            </SheetContent>
        </Sheet>
    );
};