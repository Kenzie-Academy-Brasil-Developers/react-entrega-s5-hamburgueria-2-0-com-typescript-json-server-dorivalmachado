import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";

import { theme } from "../styles/theme";
import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";
import { ProductProvider } from "./ProductContext";

interface ProviderProps{
    children: ReactNode
}

export const Provider = ({children}: ProviderProps) => {
    return(
        <ChakraProvider theme={theme}>
            <AuthProvider>
                <CartProvider>
                    <ProductProvider>
                        {children}
                    </ProductProvider>
                </CartProvider>
            </AuthProvider>
        </ChakraProvider>
    )
}