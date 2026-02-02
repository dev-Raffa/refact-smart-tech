import { createContext, useContext } from "react";
import { useOperatorsData } from "./use-operators";

type OperatorsContextType = ReturnType<typeof useOperatorsData>;

const OperatorsContext = createContext<OperatorsContextType | undefined>(undefined);

export function OperatorsProvider({ children }: { children: React.ReactNode }) {
  const operatorsData = useOperatorsData();

  return (
    <OperatorsContext.Provider value={operatorsData}>
      {children}
    </OperatorsContext.Provider>
  );
}

export function useOperators() {
  const context = useContext(OperatorsContext);

  if (context === undefined) {
    throw new Error("useOperators must be used within an OperatorsProvider");
  }

  return context;
}