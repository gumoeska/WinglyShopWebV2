import Header from "@/components/Header";
import MobileHeader from "@/components/MobileHeader";
import { ReactNode, Suspense } from "react";

type PublicProps = {
    children: ReactNode
}

const Public = (props: PublicProps) => {
    const { children } = props;

    return (
        // <ErrorBoundary>
        // <Suspense fallback={<Loader />}>
        //     {children}
        // </Suspense>
        // </ErrorBoundary>
        <div>
            <div className="fixed top-0 left-0 w-full z-50 bg-white">
                <Header />
                <MobileHeader />
            </div>
            <div className="mt-16">
                <Suspense fallback={<h1>Carregando...</h1>}>
                    {children}
                </Suspense>
            </div>
        </div>

    );
}

export default Public;