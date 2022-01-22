import { 
    Box, 
    Center, 
    Flex, 
    Grid, 
    Heading, 
    Image, 
    Stack,
    Text
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { CartModal } from "../../components/CartModal";
import { HeaderPurch } from "./HeaderPurch";
import { useCart } from "../../contexts/CartContext";

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

export const Purchases = () => {

    const {data} = useAuth();
    const {cart} = useCart();
    const [purchases, setPurchases] = useState<Purchase[]>([])

    useEffect(() => {
        api.get<Purchase[]>(`/purchases/?userId=${data.user.id}`, 
            {
                headers: {
                    Authorization: `Bearer ${data.accessToken}`,
                }
            },
            
        ).then(res => setPurchases(res.data.sort((a, b) => b.id - a.id)))
         .catch(err => console.log(err))
    }, [cart]);
    
    return(
        <>
            <CartModal/>
            <HeaderPurch/>
            <Box w='100%' p='20px 20px 0'>
                <Heading 
                    as='h2'
                    maxW='1360px'
                    m='0 auto'
                >
                    Seus pedidos
                </Heading>
            </Box>
            <Flex justifyContent='center' w='100%'>
                <Grid 
                    w='auto' 
                    templateColumns={
                        [
                            `repeat(1, 300px)`, 
                            `repeat(1, 350px)`, 
                            'repeat(2, 350px)', 
                            'repeat(2, 350px)', 
                            'repeat(3, 350px)', 
                        ]
                    } 
                    gap='20px' 
                    p={['25px 10px', '25px 10px', '35px 10px']}
                >
                    {purchases.map(purchase => (
                        <Box 
                            w={['300px', '350px']} 
                            h='400px' 
                            key={purchase.id}
                            border='2px solid'
                            borderColor='grey.100'
                            p='15px'
                        >
                            <Stack 
                                spacing='5px' 
                                h='300px' 
                                overflow='auto'
                                sx={{
                                    '&::-webkit-scrollbar': {
                                      width: '4px',
                                    },
                                    '&::-webkit-scrollbar-track': {
                                      width: '6px',
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                      background: 'grey.600',
                                      borderRadius: '24px',
                                    },
                                }}
                            >
                                {purchase.products.map(item => (
                                    <Flex key={item.id} justifyContent='space-between'>
                                        <Flex>
                                            <Center w='80px' h='80px' bg='grey.100' borderRadius='5px' mr='15px'>
                                                <Image src={item.imageUrl} alt={item.name} w='75px'/>
                                            </Center>
                                            <Text
                                                fontSize='18px' 
                                                fontWeight='700' 
                                                color='grey.600' 
                                                w={['130px', '170px']}
                                                overflow='hidden'
                                                whiteSpace='nowrap'
                                                textOverflow='ellipsis'
                                                mt='20px'
                                            >
                                                {item.name}
                                            </Text>
                                        </Flex>
                                        <Center>
                                            <Center 
                                                w='30px' 
                                                h='30px' 
                                                borderRadius='50%' 
                                                border='2px solid' 
                                                borderColor='green.primary'
                                                fontSize='18px'
                                                fontWeight='500'
                                                color='grey.600'
                                                mr='5px'
                                            >
                                                {item.quantity}
                                            </Center>
                                        </Center>
                                    </Flex>
                                ))}
                            </Stack>
                            <Flex 
                                borderTop='2px solid' 
                                borderColor='grey.300' 
                                mt='20px' 
                                justifyContent='space-between'
                                pt='10px'
                            >
                                <Text fontSize='20px' fontWeight='600' color='grey.600'>Total</Text>
                                <Text fontSize='20px' fontWeight='600' color='grey.400'>
                                    {Intl.NumberFormat('pt-BR',{
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(purchase.products.reduce((acc,elem) => acc + elem.quantity * elem.price,0))}
                                </Text>
                            </Flex>
                        </Box>
                    ))}
                </Grid>
            </Flex>
        </>
    )
}