import { IoMdMenu } from "react-icons/io";
import { PiSignIn } from "react-icons/pi";
import { TbCategory2, TbShoe } from "react-icons/tb";
import { MdOutlineContactSupport, MdOutlineHome } from "react-icons/md";
import { GrContact } from "react-icons/gr";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { FaChevronDown, FaFemale, FaMale } from "react-icons/fa";
import { ResponsiveDialog } from "../ui/responsive-dialog";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import useSession from "@/hooks/useSession";

const MobileHeader = () => {
    const [open, setOpen] = useState(false);

    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
    const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);

    const { signOut, isAuthenticated } = useSession();

    const navigate = useNavigate();

    const categories = [
        { title: 'Calçados', description: 'Veja todos os nossos calçados disponíveis' },
        { title: 'Roupas', description: 'Estas são nossas roupas disponíveis' },
        { title: 'Acessórios', description: 'Veja todos os tipos de acessórios disponíveis' }
    ];

    const fashions = [
        { title: 'Masculino', icon: FaMale, description: 'Explore o universo da moda masculina.' },
        { title: 'Feminino', icon: FaFemale, description: 'Explore o universo da moda feminina.' }
    ];

    useEffect(() => {
        if (isAuthenticated) {
            setIsLoginDialogOpen(false);
            setIsRegisterDialogOpen(false);
        }
    }, [isAuthenticated]);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" className="mr-2 px-5 py-10 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
                    <IoMdMenu size={20} className="winglyColor" />
                    <span className="sr-only">Abrir Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0 p-12">
                <ScrollArea className="my-4 h-[calc(100vh-8rem)]">
                    <div className="flex flex-col space-y-10">
                        <Card className="border-none shadow-none">
                            <div className="flex flex-row">
                                <div className="mt-3">
                                    <MdOutlineHome size={15} className="cursor-grab" />
                                </div>
                                <div className="flex flex-col rounded-lg jusitfy-start items-start">
                                    <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-grab">
                                        Início
                                    </a>
                                </div>
                            </div>
                        </Card>
                        <Collapsible>
                            <CollapsibleTrigger>
                                <Card className="border-none shadow-none">
                                    <div className="flex flex-row">
                                        <div className="mt-3">
                                            <PiSignIn size={15} />
                                        </div>
                                        <div className="flex flex-col rounded-lg jusitfy-start items-start">
                                            <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                                                Conta
                                                <FaChevronDown size={10} />
                                            </a>
                                        </div>
                                    </div>
                                </Card>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="py-2">
                                {isAuthenticated ?
                                    (
                                        <div className="w-72">
                                            <Card className="border-none shadow-none">
                                                <Button variant="ghost" className="p-8 w-full justify-start" onClick={() => navigate('/minha-conta')}>
                                                    <div className="flex flex-row">
                                                        <div className="flex flex-col rounded-lg jusitfy-start items-start">
                                                            <h4 className="scroll-m-20 text-xm font-semibold tracking-tight">
                                                                Minha Conta
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </Button>
                                            </Card>
                                            <Card className="border-none shadow-none">
                                                <Button variant="ghost" className="p-8 w-full justify-start" onClick={() => signOut()}>
                                                    <div className="flex flex-row">
                                                        <div className="flex flex-col rounded-lg jusitfy-start items-start">
                                                            <h4 className="scroll-m-20 text-xm font-semibold tracking-tight">
                                                                Sair
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </Button>
                                            </Card>
                                        </div>
                                    ) : (
                                        <div className="w-72">
                                            <Card className="border-none shadow-none">
                                                <Button variant="ghost" className="p-8 w-full justify-start" onClick={() => { setIsLoginDialogOpen(true); setOpen(false) }}>
                                                    <div className="flex flex-row">
                                                        <div className="flex flex-col rounded-lg jusitfy-start items-start">
                                                            <h4 className="scroll-m-20 text-xm font-semibold tracking-tight">
                                                                Entrar
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </Button>
                                            </Card>
                                            <Card className="border-none shadow-none">
                                                <Button variant="ghost" className="p-8 w-full justify-start" onClick={() => { setIsRegisterDialogOpen(true); setOpen(false) }}>
                                                    <div className="flex flex-row">
                                                        <div className="flex flex-col rounded-lg jusitfy-start items-start">
                                                            <h4 className="scroll-m-20 text-xm font-semibold tracking-tight">
                                                                Registre-se
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </Button>
                                            </Card>
                                        </div>
                                    )
                                }
                            </CollapsibleContent>
                        </Collapsible>
                        <Collapsible>
                            <CollapsibleTrigger>
                                <Card className="border-none shadow-none">
                                    <div className="flex flex-row">
                                        <div className="mt-3">
                                            <TbShoe size={15} />
                                        </div>
                                        <div className="flex flex-col rounded-lg jusitfy-start items-start">
                                            <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                                                Produtos
                                                <FaChevronDown size={10} />
                                            </a>
                                        </div>
                                    </div>
                                </Card>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="py-2">
                                <div className="w-72">
                                    {fashions.map((fashion) => (
                                        <Card className="border-none shadow-none">
                                            <Button variant="ghost" className="p-8 justify-start" onClick={() => { navigate('/projetos'); setOpen(false) }}>
                                                <div className="flex flex-row">
                                                    <div className="mr-4 mt-1">
                                                        <fashion.icon size={18} className="winglyColor" />
                                                    </div>
                                                    <div className="flex flex-col rounded-lg jusitfy-start items-start">
                                                        <h4 className="scroll-m-20 text-xm font-semibold tracking-tight winglyColor">
                                                            {fashion.title}
                                                        </h4>
                                                        <h4 className="scroll-m-20 text-xs font-semibold tracking-tight text-zinc-400 break-all">
                                                            {fashion.description}
                                                        </h4>
                                                    </div>
                                                </div>
                                            </Button>
                                        </Card>
                                    ))}
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                        <Collapsible>
                            <CollapsibleTrigger>
                                <Card className="border-none shadow-none">
                                    <div className="flex flex-row">
                                        <div className="mt-3">
                                            <TbCategory2 size={15} />
                                        </div>
                                        <div className="flex flex-col rounded-lg jusitfy-start items-start">
                                            <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                                                Categorias
                                                <FaChevronDown size={10} />
                                            </a>
                                        </div>
                                    </div>
                                </Card>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="py-2">
                                <div className="w-72">
                                    {categories.map((category) => (
                                        <Card className="border-none shadow-none">
                                            <Button variant="ghost" className="p-8 w-full justify-start" onClick={() => { navigate('/sobre-mim'); setOpen(false) }}>
                                                <div className="flex flex-col rounded-lg jusitfy-start items-start">
                                                    <h4 className="scroll-m-20 text-xm font-semibold tracking-tight">
                                                        {category.title}
                                                    </h4>
                                                    <h4 className="scroll-m-20 text-xs font-semibold tracking-tight text-zinc-400">
                                                        {category.description}
                                                    </h4>
                                                </div>
                                            </Button>
                                        </Card>
                                    ))}
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                        <Card className="border-none shadow-none">
                            <div className="flex flex-row">
                                <div className="mt-3">
                                    <MdOutlineContactSupport size={15} className="cursor-grab" />
                                </div>
                                <div className="flex flex-col rounded-lg jusitfy-start items-start">
                                    <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-grab">
                                        Sobre
                                    </a>
                                </div>
                            </div>
                        </Card>
                        <Card className="border-none shadow-none">
                            <div className="flex flex-row">
                                <div className="mt-3">
                                    <GrContact size={15} className="cursor-grab" />
                                </div>
                                <div className="flex flex-col rounded-lg jusitfy-start items-start">
                                    <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-grab">
                                        Contato
                                    </a>
                                </div>
                            </div>
                        </Card>
                    </div>
                </ScrollArea>
            </SheetContent>

            {/* Dialogs */}
            <ResponsiveDialog
                isOpen={isLoginDialogOpen}
                setIsOpen={setIsLoginDialogOpen}
                title="">
                <Login />
            </ResponsiveDialog>

            <ResponsiveDialog
                isOpen={isRegisterDialogOpen}
                setIsOpen={setIsRegisterDialogOpen}
                title="">
                <Register />
            </ResponsiveDialog>
        </Sheet >
    );
}

export default MobileHeader;