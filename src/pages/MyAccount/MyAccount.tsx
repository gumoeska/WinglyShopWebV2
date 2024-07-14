import useSession from "@/hooks/useSession";

const MyAccount = () => {
    const { user } = useSession();

    return (
        <main className="mx-auto max-w-5xl flex-col items-center justify-center px-5 xl:px-0">
            <div className="min-h-[39vh] flex flex-col-reverse gap-10 lg:gap-0 lg:flex-row items-center justify-between">
                <div className="flex flex-col gap-6 md:max-w-3xl">
                    <div className="space-y-5 text-center lg:text-left md:text-left">
                        <div className="flex flex-col-2 items-center">
                            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                                Minha Conta
                            </h1>
                        </div>

                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                            Usuário: {user?.username}
                        </h1>

                    </div>
                </div>
            </div>
        </main>
    );
}

export default MyAccount;