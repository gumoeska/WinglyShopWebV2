import useRoutePath from "@/hooks/useRoutePath";
import { Route, Routes } from "react-router-dom";
import Public from "../Public";
import Private from "../Private";
import MyAccount from "@/pages/MyAccount";
import HomePage from "@/pages/Home/HomePage";

const Router = () => {
    const {
        HOME_PATH,
        MY_ACCOUNT_PATH
    } = useRoutePath();

    return (
        <Routes>
            {/* Public */}
            <Route path={HOME_PATH} element={ <Public> <HomePage /> </Public> } />

            {/* Private */}
            <Route path={MY_ACCOUNT_PATH} element={ <Private> <MyAccount /> </Private> } />


            {/* <Route path={MAIN_PATH} element={ <PrivateRoute> <App /> </PrivateRoute> } />
            <Route path={HOME_PATH} element={ <PrivateRoute> <Home /> </PrivateRoute> } />
            <Route path={PRODUCTS_PATH} element={ <PrivateRoute> <Products /> </PrivateRoute> } />
            <Route path={CATEGORIES_PATH} element={ <PrivateRoute> <Categories /> </PrivateRoute> } />
            <Route path={ORDERS_PATH} element={ <PrivateRoute> <Orders /> </PrivateRoute> } />
            <Route path={DELIVERIES_PATH} element={ <PrivateRoute> <Deliveries /> </PrivateRoute> } />
            <Route path={PROSPECT_PATH} element={ <PrivateRoute> <Prospect /> </PrivateRoute> } />
            <Route path={SALES_PATH} element={ <PrivateRoute> <Sales /> </PrivateRoute> } />
            <Route path={ACCOUNTS_PATH} element={ <PrivateRoute> <Accounts /> </PrivateRoute> } />
            <Route path={AUTHORIZATIONS_PATH} element={ <PrivateRoute> <Authorizations /> </PrivateRoute> } /> */}

        </Routes>
    );
}

export default Router;