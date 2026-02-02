import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
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
import { maskCoefficients } from "@/utils/masks/mask-coefficients";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, SquarePenIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { updateBankSchema, type UpdateBankSchema } from "./schema";

import { ChangeBankStatus } from "./change-bank-status";
import type { BankItem } from "@/pages/banks/types";

export function UpdateBank({ bank }: { bank: BankItem }) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UpdateBankSchema>({
    resolver: zodResolver(updateBankSchema),
    defaultValues: {
      bankName: bank.bank.name,
      typeProduct: bank.bank.product,
      agreement: bank.bank.agreement,
      coefficients: bank.bank.coefficients?.[0]?.toString() ?? "",
    }
  });

  const selectedTypeProductBank = watch("typeProduct");
  const selectedAgreement = watch("agreement");
  const coefficientsValue = watch("coefficients");

  useEffect(() => {
    if (coefficientsValue !== undefined) {
      setValue("coefficients", maskCoefficients(coefficientsValue));
    }
  }, [setValue, coefficientsValue]);

  async function onSubmit(data: UpdateBankSchema) {
   console.log({ bankId: bank.id, ...data });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="sm"
          variant="outline"
        >
          <SquarePenIcon className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="px-0 max-w-lg">
        <DialogHeader className="px-6 py-3">
          <DialogTitle>Editar dados do banco {bank.bank.name}</DialogTitle>
          <DialogDescription>
            Atualize as informações do banco selecionado.
          </DialogDescription>
        </DialogHeader>
        <Separator />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 items-center p-6">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bankName" className="text-right">
                Banco
              </Label>
              <Input
                id="bankName"
                placeholder={bank.bank.name}
                className="w-[340px]"
                {...register("bankName")}
              />
              {errors.bankName && <p>{errors.bankName.message}</p>}
            </div>

            <div className="grid grid-cols-4 items-center gap-6">
              <Label htmlFor="typeProduct" className="text-right">
                Produto
              </Label>
              <Select
                value={selectedTypeProductBank}
                onValueChange={(value) => setValue("typeProduct", value)}
              >
                <SelectTrigger className="w-[340px] h-10">
                  <SelectValue placeholder={bank.bank.product} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Portabilidade">Portabilidade</SelectItem>
                    <SelectItem value="Refinanciamento">Refinanciamento</SelectItem>
                    <SelectItem value="Cartao">Cartão</SelectItem>
                    <SelectItem value="Emprestimo">Empréstimo</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="agreement" className="text-right">
                Convênio
              </Label>
              <Select
                value={selectedAgreement}
                onValueChange={(value) => setValue("agreement", value)}
              >
                <SelectTrigger className="w-[340px] h-10">
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

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="coefficients" className="text-right">
                Coeficiente
              </Label>
              <Input
                id="coefficients"
                type="text"
                className="w-[340px]"
                defaultValue={bank.bank.coefficients?.[0]?.toString() ?? ""}
                maxLength={10}
                {...register("coefficients")}
              />
              {errors.coefficients && <p>{errors.coefficients.message}</p>}
            </div>
          </div>

          <DialogFooter className="p-6 flex  pb-0">
            <div className="flex justify-between w-full">

              <ChangeBankStatus bank={bank} />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    Atualizando
                    <LoaderIcon className="size-4 animate-spin" />
                  </div>
                ) : (
                  "Salvar alterações"
                )}
              </Button>

            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
