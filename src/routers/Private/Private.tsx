import Header from "@/components/Header";
import MobileHeader from "@/components/MobileHeader";
import useSession from "@/hooks/useSession";
import { ValidateUserPermissions } from "@/util/validateUserPermission";
import { ReactNode, Suspense } from "react";
import { Navigate } from "react-router-dom";

type PrivateProps = {
    role?: string,
    redirectTo?: string,
    children: ReactNode
}

function Private(props: PrivateProps) {
    const { role, redirectTo = '/', children } = props;

    const { isAuthenticated, user, loadingUserData } = useSession();
    const { hasPermission } = ValidateUserPermissions({ user, role });

    if (loadingUserData) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to={redirectTo} />
    }

    if (!hasPermission) {
        return <Navigate to={redirectTo} />
    }

    return (
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

export default Private;