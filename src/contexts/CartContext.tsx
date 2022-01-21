import { createContext, ReactNode, useContext, useState } from "react";


interface CartProviderProps{
    children: ReactNode;
}

interface ProductCart{
    name: string;
    category: string;
    imageUrl: string;
    price: number;
    quantity: number;
    userId: number;
    id: number;
}

interface Product{
    name: string;
    category: string;
    imageUrl: string;
    price: number;
    userId: number;
    id: number;
}

interface CartContextData{
    cart: ProductCart[];
    addItem: (prod: Product) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider = ({children}: CartProviderProps) => {

    const [cart, setCart] = useState<ProductCart[]>(() => {
        const cart = localStorage.getItem('@Hamburgueria:cart');

        if(cart){
            return JSON.parse(cart)
        }
        
        return []
    })

    const addItem = (product: Product) => {
        const selectedItem = cart.find(elem => elem.id === product.id);

        if(selectedItem === undefined){
            const newItem = {...product, quantity: 1};
            setCart([...cart, newItem]);
            localStorage.setItem('@Hamburgueria:cart', JSON.stringify([...cart, newItem]))
        }else{
            selectedItem.quantity++
            setCart([...cart])
            localStorage.setItem('@Hamburgueria:cart', JSON.stringify([...cart]))
        }
    }

    return(
        <CartContext.Provider value={{cart, addItem}}>
            {children}
        </CartContext.Provider>
    )
};

export const useCart = () => {
    const context = useContext(CartContext);

    if(!context) {
        throw new Error('useCart should be used within CartProvider')
    }

    return context
}