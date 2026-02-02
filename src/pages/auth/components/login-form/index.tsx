import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { useLogin, type LoginError } from "@/mutation/login"
import { Form } from "@/components/ui/form";
import { useAuth } from "@/context/auth-provider"
import { LoaderIcon } from "lucide-react"
import { loginFormSchema, type LoginFormSchema } from "./schema"
import { LoginHeader } from "./header"
import { cn } from "@/utils/cn"
import { LoginFormCredentials } from "./credentials"
import { Button } from "@/components/ui/button"
import { LoginTermsAndServices } from "./terms-and-services"

export function LoginForm({ className, ...props }: Readonly<React.ComponentPropsWithoutRef<"div">>) {
  const navigate = useNavigate()
  const loginMutation = useLogin();
  const { setToken } = useAuth();
  
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      tenant: "",
      username: "",
      password: ""
    },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    try {

      localStorage.clear();

      const response = await loginMutation.mutateAsync(data);

      setToken(response.accessToken);
      navigate("/");
      toast.success("Login efetuado com sucesso!");
    } catch (err) {

      const error = err as LoginError;
      if (error.isCredentialError) {
        toast.warning("Credenciais inválidas", {
          description: error.message,
          duration: 5000,
        });
      } else {
        toast.error("Erro ao fazer login", {
          description: error.message || "Ocorreu um erro inesperado. Tente novamente.",
          duration: 5000,
        });
      }

      console.error("Erro no login:", error);
    }
  });

  return (
    <Form {...form}>
      <div className={cn("max-w-sm mx-auto relative z-50 flex flex-col gap-6", className)} {...props}>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-6">
            <LoginHeader />
            <div className="flex flex-col gap-6">
              <LoginFormCredentials form={form} />
              <Button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-500/90 text-white"
              >
                {form.formState.isSubmitting ? <LoaderIcon className="size-4 animate-spin" /> : "Acessar"}
              </Button>
            </div>
          </div>
        </form>
        <LoginTermsAndServices />
      </div>
    </Form>
  )
}
