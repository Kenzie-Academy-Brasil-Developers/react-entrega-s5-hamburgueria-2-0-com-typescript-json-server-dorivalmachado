import { 
    Box, 
    Center, 
    Flex, 
    Grid, 
    Image,
    Stack,
    Text
} from "@chakra-ui/react"

import { Button } from "../../components/Button"
import { useCart } from "../../contexts/CartContext"

interface CardProps{
    list: Products[];
}

interface Products{
    name: string;
    category: string;
    imageUrl: string;
    price: number;
    userId: number;
    id: number;
}

export const Card = ({list}: CardProps) => {

    const {addItem} = useCart();


    return(
        <Flex justifyContent='center'>
            <Grid 
                w='auto' 
                overflow={['auto', 'auto', 'initial']} 
                templateColumns={
                    [
                        `repeat(${list.length}, 300px)`, 
                        `repeat(${list.length}, 300px)`, 
                        'repeat(2, 300px)', 
                        'repeat(3, 300px)', 
                        'repeat(4, 300px)'
                    ]
                } 
                gap='20px' 
                p={['25px 10px', '25px 10px', '35px 10px']}
            >
            {list.map(product => 
                    <Box 
                        w='300px' 
                        h='346px' 
                        key={product.id}
                        border='2px solid'
                        borderColor='grey.100'
                        transition='.5s'
                        _hover={{transform: 'scale(1.05)', borderColor: 'green.primary'}}
                    >
                        <Center w='100%' h='150px' bg='grey.50'>
                            <Image src={product.imageUrl} alt={product.name} w='170px' />
                        </Center>
                        <Stack spacing='20px' mt='15px' ml='24px'>
                            <Text fontSize='18px' fontWeight='700' color='grey.600'>
                                {product.name}
                            </Text>
                            <Text fontSize='14px' color='grey.400'>
                                {product.category}
                            </Text>
                            <Text fontSize='14px' fontWeight='600' color='green.primary'>
                                {Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(product.price)}
                            </Text>
                            <Button onClick={() => addItem(product)} name="Adicionar" isMedium />
                        </Stack>
                    </Box>
                )
            }        
        </Grid>
        </Flex>
        
    )
}