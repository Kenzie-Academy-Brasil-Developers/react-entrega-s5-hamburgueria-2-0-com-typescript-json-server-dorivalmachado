import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";

import { theme } from "../styles/theme";
import { AuthProvider } from "./AuthContext";

interface ProviderProps{
    children: ReactNode
}

export const Provider = ({children}: ProviderProps) => {
    return(
        <AuthProvider>
            <ChakraProvider theme={theme}>
                {children}
            </ChakraProvider>
        </AuthProvider>
    )
}