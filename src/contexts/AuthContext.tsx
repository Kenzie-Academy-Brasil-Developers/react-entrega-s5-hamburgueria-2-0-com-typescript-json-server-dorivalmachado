import { createContext, ReactNode, useCallback, useContext, useState } from "react";

import {api} from '../services/api';

interface AuthProviderProps{
    children: ReactNode
}

interface AuthContextData {
    data: AuthState;
    signIn: (credentials: SignInCredentials) => void;
    signOut: () => void;
    registerUser: (credentials: RegisterCredentials) => void;
}

interface AuthState{
    accessToken: string;
    user: User;
}

interface User{
    email: string;
    name: string;
    id: string;
}

interface SignInCredentials{
    email: string;
    password: string;
}

interface RegisterCredentials{
    name: string;
    email: string;
    password: string;
}


const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({children}: AuthProviderProps) => {

    const [data, setData] = useState<AuthState>(() => {
        const accessToken = localStorage.getItem('@Hamburgueria:acessToken');
        const user = localStorage.getItem('@Hamburgueria:user');

        if(accessToken && user){
            return{
                accessToken,
                user: JSON.parse(user)
            };
        }

        return {} as AuthState
    });

    const signIn = useCallback(({email, password}: SignInCredentials) => {
        api.post<AuthState>('/login', {email, password})
            .then(response => {
                localStorage.setItem('@Hamburgueria:acessToken', response.data.accessToken);
                localStorage.setItem('@Hamburgueria:user', JSON.stringify(response.data.user));
                setData(response.data);
            })
            .catch(err => console.log(err))
    }, []);

    const registerUser = useCallback(({name, email, password}: RegisterCredentials) => {
        api.post<AuthState>('/users', {name, email, password})
            .then(_=>_)
            .catch(err => console.log(err));
    }, [])


    const signOut = useCallback(() => {
        localStorage.removeItem('@Hamburgueria:acessToken');
        localStorage.removeItem('@Hamburgueria:user');
        setData({} as AuthState);
    }, [])
    
    return(
        <AuthContext.Provider value={{data, signIn, signOut, registerUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if(!context){
        throw new Error('useAuth should be used within AuthProvider')
    }

    return context
}