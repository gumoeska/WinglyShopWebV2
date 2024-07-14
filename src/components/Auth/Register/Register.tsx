import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaLock } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { LuUser2 } from "react-icons/lu";
import useSession from "@/hooks/useSession";
import { RegisterCredentials } from "@/contexts";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
    username: z.string().min(1, {
        message: "O usuário é obrigatório.",
    }),
    password: z.string().min(1, {
        message: 'A senha é obrigatória.',
    }),
    email: z.string().email({
        message: 'O email é obrigatório.'
    })
})

const Register = () => {
    const { RegisterAccount } = useSession();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            email: ""
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const credentials: RegisterCredentials = {
                login: values.username,
                password: values.password,
                email: values.email,
                name: values.username,
                surname: '',
                image: '',
                phone: ''
            };

            await RegisterAccount(credentials);

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
                            Registrar
                        </h3>
                    </div>
                    <div>
                        <p className="leading-7 [&:not(:first-child)]:mt-6">
                            Já possui uma conta?
                            <a className="mx-2 winglyColor hover:text-indigo-950 cursor-grab">Entrar</a>
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
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="ml-4">Email</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center w-96">
                                            <IoMdMail className="relative left-7 top-2 transform -translate-y-1/2" />
                                            <Input
                                                {...field}
                                                type="email"
                                                placeholder="Insira seu email"
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
                            <Button className="bg-winglyColor hover:bg-indigo-950" type="submit">Registrar</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default Register;