import { useDisclosure, useToast } from "@chakra-ui/react";
import { createContext, ReactNode, useContext, useState } from "react";
import { api } from "../services/api";


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

interface Purchase{
    products: ProductCart[];
    id: number;
    total: number;
    userId: number;
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
    removeOneItem: (prod: ProductCart) => void;
    removeItem: (prod: ProductCart) => void;
    removeAll: () => void;
    concludePurchase: () => void;
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
}



const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider = ({children}: CartProviderProps) => {

    const toast = useToast();

    const [cart, setCart] = useState<ProductCart[]>(() => {
        const cartStored = localStorage.getItem('@Hamburgueria:cart');

        if(cartStored){
            return JSON.parse(cartStored)
        }
        
        return []
    });

    const {isOpen, onClose, onOpen} = useDisclosure();

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

        toast({
            title: `${product.name} adicionado com sucesso`,
            position: 'bottom-right',
            status: 'success',
            isClosable: true,
        })
    };

    const removeItem = (product: ProductCart) => {
        const newCart = cart.filter(elem => elem.id !== product.id);
        setCart([...newCart]);
        localStorage.setItem('@Hamburgueria:cart', JSON.stringify([...newCart])); 
        toast({
            title: `${product.name} removido com sucesso.`,
            position: 'bottom-right',
            status: 'success',
            isClosable: true,
        });
    };
    
    const removeOneItem = (product: ProductCart) => {
        if(product.quantity > 1){
            product.quantity--
            setCart([...cart]);
            localStorage.setItem('@Hamburgueria:cart', JSON.stringify([...cart]));
            toast({
                title: `${product.name} removido com sucesso.`,
                position: 'bottom-right',
                status: 'success',
                isClosable: true,
            });
        }else{
            removeItem(product)
        }
    };

    const removeAll = () => {
        setCart([]);
        onClose();
        localStorage.removeItem('@Hamburgueria:cart');
        toast({
            title: 'Seu carrinho está limpo.',
            description: 'Continue comprando.',
            position: 'bottom-right',
            status: 'success',
            isClosable: true,
        })
    }

    

    const concludePurchase = () => {
        const products = [...cart];
        const total = cart.reduce((acc,elem) => acc + elem.quantity * elem.price,0);
        const accessToken = localStorage.getItem('@Hamburgueria:acessToken');
        const user = localStorage.getItem('@Hamburgueria:user') || '';
        const {id: userId} = JSON.parse(user);


        api.post<Purchase>('/purchases', 
            {products, total, userId},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            },
        ).then(res => {
            setCart([]);
            onClose();
            localStorage.removeItem('@Hamburgueria:cart');
            toast({
                title: 'Compra efetuada.',
                description: 'Aproveite seu lanche.',
                position: 'bottom-right',
                status: 'success',
                isClosable: true,
            })
        })
        .catch(err => {
            toast({
                title: 'Ops !!',
                description: 'Algo deu errado.',
                position: 'bottom-right',
                status: 'error',
                isClosable: true,
            })
        })

    }

    return(
        <CartContext.Provider value={{cart, addItem, removeOneItem, removeItem, removeAll, concludePurchase, onOpen, onClose, isOpen}}>
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