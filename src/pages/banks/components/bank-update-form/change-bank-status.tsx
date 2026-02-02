import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { BankItem } from "@/pages/banks/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

interface ChangeBankStatusProps {
  bank: BankItem;
}

const formSchema = z.object({
  isActiveToday: z.boolean(),
});

type FormSchema = z.infer<typeof formSchema>;

export function ChangeBankStatus({ bank }: ChangeBankStatusProps) {
  const bankId = bank.id;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    }
  });

  const onSubmit = form.handleSubmit(async data => {
    console.log({ bankId, ...data });
  });

  return (
    <form className="flex items-center gap-2" onSubmit={onSubmit}>
      <Button
        type="submit"
        size="sm"
        variant="outline"
        className="tracking-tight disabled:cursor-not-allowed disabled:bg-transparent disabled:border-none disabled:shadow-none disabled:text-foreground"
      >
        Alterar
      </Button>

      <Controller
        name="isActiveToday"
        control={form.control}
        render={({ field }) => (
          <Switch
            id="isActiveToday"
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        )}
      />
    </form>
  )
}