import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { FaLock } from "react-icons/fa";
import { LuUser2 } from "react-icons/lu";

import { LoginCredentials } from "@/contexts";
import useSession from "@/hooks/useSession";

const formSchema = z.object({
    username: z.string().min(1, {
        message: "O usuário é obrigatório.",
    }),
    password: z.string().min(1, {
        message: 'A senha é obrigatória.',
    })
})

const Login = () => {
    const { LoginAccount } = useSession();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const credentials: LoginCredentials = {
                login: values.username,
                password: values.password
            };

            await LoginAccount(credentials);

        } catch (error) {
            console.log('error: ' + error);
        }
    }

    return (
        <div className="flex flex-col items-center">
            <div className="w-full border-b pb-4">
                <div className="flex flex-col items-center">
                    <div className="flex flex-row space-x-8">
                        <LuUser2 size={15} className="-mx-6 mt-2 winglyColor" />
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight winglyColor">
                            Entrar
                        </h3>
                    </div>
                    <div>
                        <p className="leading-7 [&:not(:first-child)]:mt-6">
                            Não tem uma conta?
                            <a className="mx-2 winglyColor hover:text-indigo-950 cursor-grab">Registre-se</a>
                        </p>
                    </div>
                </div>
            </div>



            <div className="py-10 w-max">

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="ml-4">Usuário</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center w-96">
                                            <LuUser2 className="relative left-7 top-2 transform -translate-y-1/2" />
                                            <Input
                                                {...field}
                                                placeholder="Insira seu usuário"
                                                className="max-w-sm pl-10" />
                                        </div>
                                    </FormControl>
                                    <FormMessage className="ml-4" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="ml-4">Senha</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center w-96">
                                            <FaLock className="relative left-7 top-2 transform -translate-y-1/2" />
                                            <Input
                                                {...field}
                                                type="password"
                                                placeholder="Insira sua senha"
                                                className="max-w-sm pl-10" />
                                        </div>
                                    </FormControl>
                                    <FormMessage className="ml-4" />
                                </FormItem>
                            )}
                        />

                        <div className="ml-4 flex flex-col">
                            <Button className="bg-winglyColor hover:bg-indigo-950" type="submit">Entrar</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default Login;