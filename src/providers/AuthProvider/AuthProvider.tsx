import { ReactNode, useEffect, useState } from "react"
import { AuthContext, LoginCredentials, RegisterCredentials, User } from "../../contexts";
import { useLocation, useNavigate } from "react-router-dom";
import { getToken, removeToken, setToken } from "@/util/jwtToken";
import { setAuthorizationHeader } from "@/services/interceptors";
import { AxiosError } from "axios";
import { api } from "@/services/api";
import Paths from "@/routers/Paths";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

type AuthProviderProps = {
  children: ReactNode
}

const AuthProvider = (props: AuthProviderProps) => {
  // Base props
  const { children } = props;

  // Auth
  const [user, setUser] = useState<User>();
  const token: string = getToken();
  const isAuthenticated = Boolean(token);

  // Loading data
  const [loadingUserData, setLoadingUserData] = useState(true);

  const { toast } = useToast();

  // Routes
  const navigate = useNavigate();
  const { pathname } = useLocation();

  async function LoginAccount(params: LoginCredentials) {
    const { login, password } = params;

    try {
      const response = await api.post('/auth/login', { login, password });
      const { authData, username } = response.data;

      setUser({ username });
      setToken(authData);
      setAuthorizationHeader({ request: api.defaults, token });

      //   messageApi.open({
      //     type: 'success',
      //     content: 'Logado com sucesso!'
      //   });

      toast({ variant: 'success', description: 'Logado com sucesso!' });

    } catch (error) {
      const err = error as AxiosError;

      toast({ variant: 'destructive', description: 'Ocorreu um erro ao entrar.' });

      return err;
    }
  }

  async function RegisterAccount(account: RegisterCredentials): Promise<boolean | undefined> {
    const { login, email, password, name, surname, image, phone } = account;

    try {
      const response = await api.post('/auth/register', {
        login, email, password, name, surname, image, phone
      });

      const result = Boolean(response.data);

      toast({ variant: 'success', description: 'Conta criada com sucesso!' });
      navigate('/');

      return result;

    } catch (error) {
      toast({ variant: 'destructive', description: 'Ocorreu um erro ao criar a conta.' });

      return false;
    }
  }

  function signOut() {
    removeToken();
    setUser(undefined)
    setLoadingUserData(false)

    toast({ variant: 'destructive', description: 'Você saiu da sua conta.' });

    navigate(Paths.HOME_PATH)
  }

  useEffect(() => {
    if (!token) {
      setUser(undefined)
      setLoadingUserData(false)
    }
  }, [navigate, pathname, token])

  useEffect(() => {
    const token = getToken()

    async function getUserData() {
      setLoadingUserData(true)

      try {
        const response = await api.get('/auth/profile')

        if (response?.data) {
          const { username } = response.data
          setUser({ username })
        }
      } catch (error) {
        // Error ..
      } finally {
        setLoadingUserData(false)
      }
    }

    if (token) {
      setAuthorizationHeader({ request: api.defaults, token })
      getUserData()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loadingUserData,
        LoginAccount,
        RegisterAccount,
        signOut
      }}>
      {children}
      <Toaster />
    </AuthContext.Provider>
  )
}

export default AuthProvider;