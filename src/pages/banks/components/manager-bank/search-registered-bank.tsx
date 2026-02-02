import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon, LandmarkIcon } from "lucide-react";
import type { BankItem } from "@/pages/banks/types";
import { searchRegisteredBanksSchema, type SearchRegisteredBanksSchema } from "@/pages/banks/schemas";

interface SearchRegisteredBankProps {
  className?: string;
  onBankSelect: (bankId: string, bankName: string) => void;
  selectedBankName?: string;
  isActiveRegistration?: boolean;
}

export function SearchRegisteredBank({
  className,
  onBankSelect,
  selectedBankName,
}: SearchRegisteredBankProps) {
  const [bank, setBank] = useState("");
  //const [shouldSearch, setShouldSearch] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState<BankItem | null>(null);

  const { setValue, watch } = useForm<SearchRegisteredBanksSchema>({
    resolver: zodResolver(searchRegisteredBanksSchema),
  });

  const selectedBankId = watch("bankId");

  const handleBankSelect = (bankId: string, bankName: string, fullBank: BankItem) => {
    setValue("bankId", bankId);
    setSelectedBank(fullBank);
    onBankSelect(`${fullBank.bank.code},${fullBank.id}`, bankName);
    setOpen(false);
  };

  const handleBankChange = (value: string) => {
    setBank(value);
    //setShouldSearch(value.length >= 2);
  };

  const allBanks = [
        {
            "id": "65cb46a1-4651-422d-a718-e858062df7bb",
            "bank": {
                "relevance": 2,
                "code": 1,
                "name": "Banco Facta",
                "product": "Clt",
                "agreement": "None",
                "coefficients": []
            },
            "isActive": true
        },
        {
            "id": "836022cb-9f71-4965-90b9-d9c2f0eabf79",
            "bank": {
                "relevance": 3,
                "code": 10,
                "name": "Banco PH",
                "product": "Clt",
                "agreement": "None",
                "coefficients": []
            },
            "isActive": true
        },
        {
            "id": "33c6cdbd-7167-44cc-beb3-6c367d45705b",
            "bank": {
                "relevance": 4,
                "code": 396,
                "name": "HUB Crédito",
                "product": "Clt",
                "agreement": "None",
                "coefficients": [
                    0.0
                ]
            },
            "isActive": true
        },
        {
            "id": "1f49df29-1afd-45fc-9b2a-096868f4e8c2",
            "bank": {
                "relevance": 15,
                "code": 10,
                "name": "Banco C6",
                "product": "Clt",
                "agreement": "None",
                "coefficients": []
            },
            "isActive": true
        }
    ]

  const filteredBanks = allBanks?.filter(bankItem => {
    const searchTerm = bank.toLowerCase();
    return (
      bankItem.bank.code.toString().toLowerCase().includes(searchTerm) ||
      bankItem.bank.name.toLowerCase().includes(searchTerm)
    );
  });

  const getDisplayText = () => {
    if (selectedBank) {
      return `${selectedBank.bank.code} - ${selectedBank.bank.name} ${selectedBank.bank.product === "NaoDefinido"
        ? "" : `- ${selectedBank.bank.product}`}`;
    }
    return selectedBankName || "Selecione o banco";
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "flex justify-between items-center",
            className ? className : "w-[280px] lg:w-80"
          )}
        >
          <span className="w-64 text-left truncate xl:w-72">
            {getDisplayText()}
          </span>

          <ChevronDownIcon className="size-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="bg-transparent border-none shadow-none flex justify-center items-center">
        <Command className="border shadow-md md:min-w-80" shouldFilter={false}>
          <CommandInput
            placeholder="Informe o nome ou código do banco"
            value={bank}
            onValueChange={handleBankChange}
          />

          <CommandList>
            {bank.length < 2 && (
              <CommandEmpty>Digite 2 caracteres para iniciar a busca</CommandEmpty>
            )}
            {bank.length >= 2 && (
              <>
                <CommandGroup heading="Bancos">
                  {filteredBanks?.map((bankItem: BankItem) => (
                    <CommandItem
                      key={bankItem.id}
                      value={`${bankItem.bank.code} ${bankItem.bank.name}`}
                      onSelect={() => handleBankSelect(bankItem.id, bankItem.bank.name, bankItem)}
                    >
                      <LandmarkIcon />

                      <span className="flex items-center gap-2">
                        {bankItem.bank.code} - {" "}
                        {bankItem.bank.name} {" "}
                        {bankItem.bank.product === "NaoDefinido" ? "" : `- ${bankItem.bank.product}`}
                      </span>

                      {selectedBankId === bankItem.id && (
                        <CommandShortcut>
                          <Checkbox checked />
                        </CommandShortcut>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}