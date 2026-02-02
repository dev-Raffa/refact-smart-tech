import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddExistingBankTab } from "./add-existing-bank-form";
import { AddNewBankTab } from "./add-new-bank-form";

export function AddNewBankContent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button" size="sm" className="w-44 lg:w-auto lg:text-[13px]">
          Adicionar banco
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg p-0">
        <Tabs defaultValue="existingBank" className="pt-6">
          <TabsList className="w-full bg-transparent border-b-[1.5px] flex justify-start items-center pl-8 gap-6">
            <TabsTrigger
              className="flex items-center gap-2 pb-3 data-[state=active]:border-b-[3px] data-[state=active]:border-red-500"
              value="existingBank"
            >
              Adicionar banco a operação
            </TabsTrigger>

            <TabsTrigger
              className="flex items-center gap-2 pb-3 data-[state=active]:border-b-[3px] data-[state=active]:border-red-500"
              value="newBank"
            >
              Criar um novo banco
            </TabsTrigger>
          </TabsList>

          <TabsContent value="existingBank">
            <AddExistingBankTab />
          </TabsContent>

          <TabsContent value="newBank">
            <AddNewBankTab />
          </TabsContent>
        </Tabs>
        <Separator />
      </DialogContent>
    </Dialog>
  )
}