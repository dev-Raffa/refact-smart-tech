import ProtectedLayout from "./protected-layout";
import { Outlet } from "react-router";

export function PrivateLayout() {

  return (
    <div className="size-full">
      <main className="size-full">
        <ProtectedLayout>
          <Outlet /> 
        </ProtectedLayout>
      </main>
    </div>
  );
}