import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Row } from "@tanstack/react-table";
import { Controller, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import type { getRealmResponse } from "../../types";
import { cn } from "@/utils/cn";
import { updatePartnerStatusMutation } from "../../hook";

interface UpdatePartnerStatusProps {
  row: Row<getRealmResponse>;
}

const FormSchema = z.object({
  enabled: z.boolean(),
});

export function UpdatePartnerStatus({
  row
}: Readonly<UpdatePartnerStatusProps>) {
  const initialStatus = row.original.enabled;
  const { mutateAsync: updatePartnerStatus } = updatePartnerStatusMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      enabled: row.original.enabled,
    },
  });


  const currentStatus = useWatch({
    control: form.control,
    name: "enabled",
  });

  const isStatusChanged = currentStatus !== initialStatus;
  const isActiveLabel = currentStatus ? "Ativo" : "Inativo";

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await updatePartnerStatus({
      realm: row.original.realm,
      enabled: data.enabled,
    });
  }

  return (
    <form
      className="flex items-center space-x-6"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="flex justify-center items-center space-x-6">
        <Badge className={cn(
          "bg-transparent border border-zinc-200 text-xs tracking-wide hover:bg-transparent dark:border-border",
          currentStatus === true && "text-emerald-600 hover:text-emerald-300",
          currentStatus === false && "text-red-600 hover:text-red-300",
        )}>
          <span
            className={cn(
              "size-1 mr-2",
              currentStatus === true && "bg-emerald-600 hover:bg-emerald-300",
              currentStatus === false && "bg-red-600 hover:bg-red-300",
            )}
          />
          {isActiveLabel}
        </Badge>

        <Controller
          name="enabled"
          control={form.control}
          render={({ field }) => (
            <Switch
              id="enabled"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
      </div>

      <Button
        type="submit"
        size="sm"
        className="h-8 text-[13px] font-medium disabled:cursor-not-allowed disabled:bg-transparent disabled:text-muted-foreground"
        disabled={!isStatusChanged}
      >
        Alterar status
      </Button>
    </form >
  );
}
