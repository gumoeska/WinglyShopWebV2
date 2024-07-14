import { FaFemale, FaMale, FaShoppingCart } from "react-icons/fa";
import Logo from "../Logo";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu";
import { ListItem } from "../ui/listItem";
import { Button } from "../ui/button";
import { FaCircleUser } from "react-icons/fa6";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ResponsiveDialog } from "../ui/responsive-dialog";
import { useEffect, useState } from "react";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import useSession from "@/hooks/useSession";
import { useNavigate } from "react-router-dom";

const Header = () => {
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
        { title: 'Masculino', icon: FaMale, description: 'Descubra as últimas tendências da moda masculina e eleve seu estilo com nossa coleção exclusiva.' },
        { title: 'Feminino', icon: FaFemale, description: 'Explore o universo da moda feminina e descubra uma coleção que combina elegância, conforto e as últimas tendências.' }
    ];

    useEffect(() => {
        if (isAuthenticated) {
            setIsLoginDialogOpen(false);
            setIsRegisterDialogOpen(false);
        }
    }, [isAuthenticated]);

    return (
        <header className="mx-auto max-w-6xl items-center justify-between gap-20 px-5 py-6 xl:px-0 hidden md:flex">
            <Logo />
            <div className="flex flex-row mt-2">
                <NavigationMenu>
                    <NavigationMenuList className="space-x-6">
                        <NavigationMenuItem>
                            <Button variant={'ghost'} className="text-zinc-800" onClick={ () => navigate('/') }>
                                Início
                            </Button>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Produtos</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.95fr_1fr]">
                                    {fashions.map((fashion) => (
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                                <a className="flex h-full w-full select-none flex-col justify-end rounded-md from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md hover:scale-105 transform transition-all duration-250 ease-in-out"
                                                    href="/">
                                                    <div className="flex flex-row">
                                                        <div className="mb-2 mt-8">
                                                            <fashion.icon size={30} className="winglyColor" />
                                                        </div>
                                                        <div className="mb-2 mt-4 mx-4 text-lg font-medium winglyColor">
                                                            {fashion.title}
                                                            <p className="text-sm leading-tight text-muted-foreground">
                                                                {fashion.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </NavigationMenuLink>
                                        </li>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Categorias</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-8 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                    {categories.map((category) => (
                                        <ListItem
                                            key={category.title}
                                            title={category.title}
                                            // href={component.href}
                                            className="hover:scale-105 transform transition-all duration-250 ease-in-out">
                                            {category.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Button variant={'ghost'} className="text-zinc-800">
                                Sobre
                            </Button>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Button variant={'ghost'} className="text-zinc-800">
                                Contato
                            </Button>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className="flex flex-row space-x-8">
                <div>
                    <Button variant={'ghost'}>
                        <FaShoppingCart size={16} className="text-zinc-800" />
                    </Button>
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={'ghost'} className="rounded-full">
                                <FaCircleUser size={25} className="text-zinc-800" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            {isAuthenticated ?
                                (
                                    <DropdownMenuGroup className="p-2">
                                        <DropdownMenuItem>
                                            <Button variant={'ghost'} className="w-full hover:scale-105 transform transition-all duration-250 ease-in-out" onClick={() => navigate('/minha-conta')}>
                                                <p className="text-sm font-medium leading-none">
                                                    Minha Conta
                                                </p>
                                            </Button>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Button variant={'ghost'} className="w-full hover:scale-105 transform transition-all duration-250 ease-in-out" onClick={() => signOut()}>
                                                <p className="text-sm font-medium leading-none">
                                                    Sair
                                                </p>
                                            </Button>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                ) : (
                                    <DropdownMenuGroup className="p-2">
                                        <DropdownMenuItem>
                                            <Button variant={'ghost'} className="w-full hover:scale-105 transform transition-all duration-250 ease-in-out" onClick={() => setIsLoginDialogOpen(true)}>
                                                <p className="text-sm font-medium leading-none">
                                                    Entrar
                                                </p>
                                            </Button>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Button variant={'ghost'} className="w-full hover:scale-105 transform transition-all duration-250 ease-in-out" onClick={() => setIsRegisterDialogOpen(true)}>
                                                <p className="text-sm font-medium leading-none">
                                                    Registre-se
                                                </p>
                                            </Button>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                )
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

            </div>

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
        </header>
    );
}

export default Header;