import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import {
  registerExistingBankSchema,
  type RegisterExistingBankSchema,
} from "./schema";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { SearchRegisteredBank } from "../search-registered-bank";
/*
interface AddExistingBankTabProps {
  setIsOpen: (isOpen: boolean) => void;
}
*/
export function AddExistingBankTab() {
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterExistingBankSchema>({
    resolver: zodResolver(registerExistingBankSchema),
    defaultValues: {
      bankId: "",
      product: "",
      agreement: "",
    },
  });


  const [selectedBankName, setSelectedBankName] = useState("");

  const selectedBankId = watch("bankId");
  console.log(selectedBankId)
  const selectedTypeProduct = watch("product");
  const selectedAgreement = watch("agreement");

  const handleBankSelect = (bankId: string, bankName: string) => {
    setValue("bankId", bankId);
    setSelectedBankName(bankName);
  };

  async function onSubmit() {
    console.log({ bankId: selectedBankId, product: selectedTypeProduct, agreement: selectedAgreement });
  }

  return (
    <div>
      <DialogHeader className="p-6">
        <DialogTitle>
          Escolha um banco existente para sua operação
        </DialogTitle>
        <DialogDescription>
          Ative um banco registrado no sistema para funcionar na sua operação.
        </DialogDescription>
      </DialogHeader>
      <Separator />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 pt-8 pb-4">
          <div className="grid px-6 grid-cols-4 items-center gap-4">
            <Label htmlFor="bankId" className="text-right">
              Banco
            </Label>

            <SearchRegisteredBank
              onBankSelect={handleBankSelect}
              selectedBankName={selectedBankName}
            />
          </div>

          <div className="grid grid-cols-4  px-6 items-center gap-4">
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
        <DialogFooter className=" px-12 py-6">
          <Button
            type="submit"
            size="sm"
            className="inline-flex items-center gap-1.5"
          >
            {!isSubmitting && <span>Atualizar operação</span>}
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