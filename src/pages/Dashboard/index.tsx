import { 
    Box, 
    Button, 
    Center, 
    Flex, 
    Image, 
    Input, 
    InputGroup, 
    InputRightElement, 
    Text, 
    useBreakpointValue
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {FaShoppingCart, FaSearch} from 'react-icons/fa';
import {MdOutlineLogout} from 'react-icons/md'

import logo from '../../assets/logo.svg'
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { theme } from "../../styles/theme";
import { Card } from "./Card";
import { HeaderDash } from "./HeaderDash";

interface Products{
    name: string;
    category: string;
    imageUrl: string;
    price: number;
    userId: number;
    id: number;
}

export const Dashboard = () => {

    const [products, setProducts] = useState<Products[]>([])

    useEffect(() => {
        api.get<Products[]>('/products')
            .then(res => setProducts(res.data))
            .catch(err => console.log(err))
    }, [])

    return(
        <>
            <HeaderDash/> 
            <Card list={products} />
        </>
    )
}

// 1360px