import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { usePartnerForm } from "./hook";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookText, UserStar } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PartnerForm = () => {
    const { actions, form, partners } = usePartnerForm();

    return (
        <form onSubmit={actions.onSubmit} autoComplete="off" className="h-full relative">
            <div className="flex flex-col gap-6 justify-center">
                <Accordion type="multiple" defaultValue={["partner-info", "admin-user"]} >
                    <AccordionItem value="partner-info">
                        <AccordionTrigger className="bg-secondary pl-6 pr-6">
                            <div className="flex items-center gap-2">
                                <div className="bg-red-700 text-white rounded-full p-1">
                                    <BookText className="size-5" />
                                </div>
                                Informações gerais
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-6 pr-4 gap-6 flex flex-col pt-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite o nome da empresa parceira" autoComplete="off" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="tenant"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Replicar com base em:</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value} {...field}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Selecione o tenant" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {partners.map((partner) => (
                                                        partner.enabled && (
                                                            <SelectItem key={partner.realm} value={partner.realm}>
                                                                {partner.realm}
                                                            </SelectItem>
                                                        )
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="admin-user">
                        <AccordionTrigger className="bg-secondary pr-6">
                            <div className="pl-6 flex items-center gap-4">
                                <div className="bg-red-700 rounded-full text-white p-1">
                                    <UserStar className="size-5" />
                                </div>
                                Usuário administrador
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-6 pr-4 gap-6 flex flex-col pt-4">
                            <FormField
                                control={form.control}
                                name="replicationConfigurationRequest.adminUser.username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email do usuário administrador</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="Digite o email" autoComplete="new-password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="replicationConfigurationRequest.adminUser.password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Senha</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite a senha do usuário administrador" autoComplete="new-password" {...field} type="password" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <div className="flex w-full absolute bottom-4 justify-end pr-4 gap-4">
                <Button
                    disabled={form.formState.isSubmitting}
                    type="submit">
                    {form.formState.isSubmitting ? "Salvando..." : "Salvar"}
                </Button>
            </div>
        </form>
    );
};