import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Product{
    name: string;
    category: string;
    imageUrl: string;
    price: number;
    userId: number;
    id: number;
}

interface ProductProviderProps{
    children: ReactNode;
}

interface ProductContextData{
    productsList: Product[];
    handleFilter: (param: string) => void
}



const ProductContext = createContext<ProductContextData>({} as ProductContextData);

export const ProductProvider = ({children}:ProductProviderProps) => {

    const [products, setProducts] = useState<Product[]>([]);
    const [productsList, setProductsList] = useState<Product[]>([]);


    useEffect(() => {
        api.get<Product[]>('/products')
            .then(res => {
                setProducts(res.data);
                setProductsList(res.data);
            })
            .catch(err => console.log(err))
    }, []);

    const handleFilter = (searchName: string) => {
        if(searchName === ''){
            setProductsList([...products])
        }else{
            setProductsList([...products.filter(item => {
                const regex = new RegExp(searchName, 'gi')

                return regex.test(item.name) || regex.test(item.category)
            })])
        }
    }

    return(
        <ProductContext.Provider value={{productsList, handleFilter}}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProduct = () => {
    const context = useContext(ProductContext);

    if(!context){
        throw new Error('useProduct should be used within ProductProvider')
    }

    return context
}