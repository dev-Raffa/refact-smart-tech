import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { registerNewBankSchema, type RegisterNewBankSchema } from "../add-existing-bank-form/schema";

/*
interface AddNewBankTabProps {
  setIsOpen: (isOpen: boolean) => void;
}
*/
export function AddNewBankTab() {
  const {
    handleSubmit,
    watch,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterNewBankSchema>({
    resolver: zodResolver(registerNewBankSchema),
    defaultValues: {
      name: "",
      code: "",
      product: "",
      agreement: "",
    },
  });

  const selectedTypeProduct = watch("product");
  const selectedAgreement = watch("agreement");

  async function onSubmit(data: RegisterNewBankSchema) {
    console.log(data);}

  return (
    <div>
      <DialogHeader className="p-6">
        <DialogTitle>
          Informe os dados completos do novo banco
        </DialogTitle>
        <DialogDescription>
          Cadastre um novo banco preenchendo o formulário corretamente.
        </DialogDescription>
      </DialogHeader>
      <Separator />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full grid gap-6 pt-8 pb-4">
          <div className="grid px-6 grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Banco
            </Label>
            <Input
              type="text"
              placeholder="Nome do banco"
              className="w-80 h-10"
              {...register("name")}
            />
          </div>
          {errors.name && (
            <p className="text-destructive text-sm text-right">
              {errors.name.message}
            </p>
          )}

          <div className="grid px-6 grid-cols-4 items-center gap-4">
            <Label htmlFor="code" className="text-right">
              Código
            </Label>
            <Input
              type="text"
              placeholder="Código do banco"
              className="w-80 h-10"
              {...register("code")}
            />
          </div>
          {errors.code && (
            <p className="text-destructive text-sm text-right">
              {errors.code.message}
            </p>
          )}

          <div className="grid px-6 grid-cols-4 items-center gap-4">
            <Label htmlFor="product" className="text-right">
              Produto
            </Label>
            <Select
              value={selectedTypeProduct}
              onValueChange={(value) => setValue("product", value)}
            >
              <SelectTrigger className="w-80">
                <SelectValue placeholder="Escolha uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Portabilidade">Portabilidade</SelectItem>
                  <SelectItem value="Refinanciamento">Refinanciamento</SelectItem>
                  <SelectItem value="Emprestimo">Empréstimo</SelectItem>
                  <SelectItem value="Cartao">Cartão</SelectItem>
                  <SelectItem value="Clt">Clt</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {errors.product && (
            <p className="text-destructive text-sm text-right">
              {errors.product.message}
            </p>
          )}

          <div className="grid px-6 grid-cols-4 items-center gap-4">
            <Label htmlFor="agreement" className="text-right">
              Convênio
            </Label>
            <Select
              value={selectedAgreement}
              onValueChange={(value) => setValue("agreement", value)}
            >
              <SelectTrigger className="w-80">
                <SelectValue placeholder="Escolha uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Inss">Inss</SelectItem>
                  <SelectItem value="Siape">Siape</SelectItem>
                  <SelectItem value="None">Nenhum convênio</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {errors.agreement && (
            <p className="text-destructive text-sm text-right">
              {errors.agreement.message}
            </p>
          )}
        </div>
        <DialogFooter className="px-12 py-6">
          <Button
            type="submit"
            size="sm"
            className="inline-flex items-center gap-1.5"
          >
            {!isSubmitting && <span>Cadastrar e atualizar operação</span>}
            {isSubmitting && (
              <div className="flex items-center gap-1">
                Cadastrando
                <LoaderIcon className="size-4 animate-spin" />
              </div>
            )}
          </Button>
        </DialogFooter>
      </form>
    </div>
  )
}