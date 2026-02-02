import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, type ReactNode } from "react";
import { useSearchParams, useNavigate } from "react-router";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BanksSkeleton } from "../bank-skeleton";
import { Banks } from "../bank-card";
import type { BankItem } from "@/pages/banks/types";


const tabsConfig = [
  { value: "clt", label: "CLT", produto: "Clt" },
  { value: "refinancing", label: "Refinanciamento", produto: "Refinanciamento" },
  { value: "carding", label: "Cartão", produto: "Cartao" },
  { value: "loan", label: "Empréstimo", produto: "Emprestimo" },
];

function SortableBank({ bank, children }: { bank: any, children: ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: bank.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

export function BanksContent() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const urlTab = searchParams.get("tab") || "clt";
  const [activeTab, setActiveTab] = useState(urlTab);
  const sensors = useSensors(useSensor(PointerSensor));
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`?tab=${value}`, { replace: true });
  };

  
  const banks = [
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
  
  const handleReorder = async (
    reorderedBanks: BankItem[],
    product: string,
    previousBanks: BankItem[]
  ) => {
    if (!banks || !reorderedBanks) return;

    const originalBanks = previousBanks.filter(
      (bank) => bank.bank.product === product
    );
    const movedIndex = originalBanks.findIndex(
      (bank, index) => bank.id !== reorderedBanks[index]?.id
    );
    if (movedIndex === -1) return;
    
  };

  const handleDragEnd = (event: DragEndEvent, filteredBanks: BankItem[], produto: string) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;


    const oldIndex = filteredBanks.findIndex((item) => item.id === active.id);
    const newIndex = filteredBanks.findIndex((item) => item.id === over.id);

    const reordered = arrayMove(filteredBanks, oldIndex, newIndex);

    const previousBanks = [...banks];

    handleReorder(reordered, produto, previousBanks);
  };
  if (status === "pending") return <BanksSkeleton />;

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className="w-full min-h-svh"
    >
      <div className="w-full">
        <TabsList>
          {tabsConfig.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {tabsConfig.map((tab) => {
        const filteredBanks = banks.filter(
          (bank) =>
            bank.bank.product?.toLowerCase() === tab.produto.toLowerCase()
        );


        return (
          <TabsContent key={tab.value} value={tab.value}>
            <Card className="p-0 shadow-none border-none">
              <div className="py-3 pt-6">
                {filteredBanks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                    <p className="text-sm sm:text-base font-medium">
                      Nenhum banco encontrado para o produto{" "}
                      <span className="text-foreground">{tab.label}</span>.
                    </p>
                    <p className="text-xs sm:text-sm mt-1 text-muted-foreground">
                      Tente selecionar outra aba ou adicionar novos bancos.
                    </p>
                  </div>
                ) : (
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={(event) =>
                      handleDragEnd(event, filteredBanks, tab.produto)
                    }
                  >
                    <SortableContext
                      items={filteredBanks}
                      strategy={rectSortingStrategy}
                    >
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {filteredBanks.map((bank) => (
                          <SortableBank key={bank.id} bank={bank}>
                            <Banks data={bank} />
                          </SortableBank>
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                )}
              </div>
            </Card>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
