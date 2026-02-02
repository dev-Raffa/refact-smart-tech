import { QueryClientProvider } from "@tanstack/react-query"
import { AppRouters } from "./routers"
import { queryClient } from "./config/react-query"
import { AuthProvider } from "./context/auth-provider"

export function App() {
  return (
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <AppRouters />
    </QueryClientProvider>
    </AuthProvider>
  )
}

export default App

