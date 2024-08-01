import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { GetProducts } from "@/services/products/productsRequests";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import { GiShoppingBag } from "react-icons/gi";

const HomePage = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const getAllProducts = async () => {
        const dataRequest: Product[] | undefined = await GetProducts();

        if (dataRequest === undefined) return;

        setProducts(dataRequest);
    }

    useEffect(() => {
        if (products.length) return;

        getAllProducts();
    });

    // const products = [
    //     { image: 'Image', description: 'Tênis', price: 'R$ 100,00' },
    //     { image: 'Image', description: 'Tênis', price: 'R$ 100,00' },
    //     { image: 'Image', description: 'Tênis', price: 'R$ 100,00' },
    //     { image: 'Image', description: 'Tênis', price: 'R$ 100,00' },
    //     { image: 'Image', description: 'Tênis', price: 'R$ 100,00' },
    //     { image: 'Image', description: 'Tênis', price: 'R$ 100,00' },
    //     { image: 'Image', description: 'Tênis', price: 'R$ 100,00' },
    //     { image: 'Image', description: 'Tênis', price: 'R$ 100,00' }
    // ];

    return (
        <main className="mx-auto max-w-5xl flex-col items-center justify-center px-5 xl:px-0">
            <div className="min-h-[39vh] flex flex-col-reverse gap-10 lg:gap-0 lg:flex-row items-center justify-between py-20">
                <div className="flex flex-col gap-6 md:max-w-3xl">
                    <div className="space-y-5 text-center lg:text-left md:text-left">
                        <div className="flex flex-col">
                            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                                <span className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-muted-foreground hover:text-indigo-950 transition-colors winglyColor">
                                    Wingly Shop.
                                </span>
                                <br />
                                {/* Onde moda e tecnologia se encontram para criar o seu estilo. */}
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-6 md:max-w-3xl">
                    <div className="py-20">
                        <GiShoppingBag size={85} className="winglyColor" />
                    </div>
                </div>
            </div>

            <div className="py-4">
                <div className="border-t"></div>
            </div>

            <div className="py-8">
                <div className="flex flex-row justify-between p-3">
                    <Button className="bg-winglyColor hover:bg-indigo-950">
                        Ver todos
                    </Button>
                    <div className="flex flex-row items-center justify-start">
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                            Produtos
                        </h3>
                    </div>
                    <div className="px-12"></div>
                </div>
                <div className="grid grid-cols-4">
                    {products.map((product) => {
                        return (
                            <Card className="flex flex-col items-center m-2 hover:scale-105 transform transition-all duration-250 ease-in-out">
                                <CardHeader className="h-52">
                                    {/* {product.image} */}
                                </CardHeader>
                                <CardContent>
                                    {product.description}
                                </CardContent>
                                <CardFooter>
                                    R$ {product.price}
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}

export default HomePage;