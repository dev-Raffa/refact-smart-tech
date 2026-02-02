import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { maskPhone } from "@/utils/masks/mask-phone";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, LoaderIcon, PencilIcon, PhoneCallIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { Row } from "@tanstack/react-table";
import type { Operator } from "../../types";

interface EditOperatorPhoneNumberProps {
  row: Row<Operator>;
}

const formSchema = z.object({
  phone: z
    .string()
    .min(15, "Informe um número de telefone válido.")
});

type FormSchema = z.infer<typeof formSchema>;

export function EditOperatorPhoneNumber({ row }: EditOperatorPhoneNumberProps) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: row.original.worker.phonenumber || '',
    },
  });

  const phoneNumber = form.watch('phone');
  
  useEffect(() => {
    if (phoneNumber) form.setValue('phone', maskPhone(phoneNumber));
  }, [phoneNumber, form]);

  const onSubmit = async (data: FormSchema) => {
    console.log("Updating operator phone number to:", data.phone);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex justify-center items-center">
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="icon"
          >
            <PencilIcon className="size-4" />
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-lg p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="p-6">
              <DialogTitle>Editar telefone do operador</DialogTitle>
              <DialogDescription>
                Atualize o número do operador para receber os seus clientes.
              </DialogDescription>
            </DialogHeader>
            <Separator />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="py-10 px-6">
                  <FormLabel className="max-w-36 w-full flex items-center gap-2">
                    <PhoneCallIcon className="size-4" />
                    Telefone Atual
                  </FormLabel>

                  <FormControl>
                    <Input
                      id="phone"
                      placeholder="Digite o telefone"
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      inputMode="numeric"
                      maxLength={15}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator />
            <DialogFooter className="flex items-center gap-4 p-6">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="flex items-center gap-2"
                >
                  <ArrowLeftIcon className="size-4" />
                  Voltar
                </Button>
              </DialogClose>

              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <div className="flex items-center gap-2">
                    Atualizando
                    <LoaderIcon className="size-4 animate-spin" />
                  </div>
                ) : "Atualizar Telefone"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}