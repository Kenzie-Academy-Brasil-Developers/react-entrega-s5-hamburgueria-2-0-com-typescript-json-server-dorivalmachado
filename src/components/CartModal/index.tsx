import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Center,
    Flex,
    Image,
    Stack,
} from '@chakra-ui/react';
import{FaTrash} from 'react-icons/fa'
import { Button } from '../Button';

import { useCart } from '../../contexts/CartContext';
import { theme } from '../../styles/theme';

interface ProductCart{
    name: string;
    category: string;
    imageUrl: string;
    price: number;
    quantity: number;
    userId: number;
    id: number;
}

export const CartModal = () => {
    const {
        cart, 
        isOpen, 
        onClose, 
        addItem, 
        removeOneItem, 
        removeAll, 
        concludePurchase,
        removeItem
    } = useCart();

    const addOneItem = (cartProduct: ProductCart) => {
        const {name, category, id, imageUrl, price, userId} = cartProduct
        addItem({name, category, id, imageUrl, price, userId})
    }

    return(
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent borderRadius='8px' overflow='hidden' w={['375px', '500px']} m='0 5px'>
                <ModalHeader 
                    bg='green.primary' 
                    fontSize='18px'
                    fontWeight='700'
                    color='white'
                >
                    Carrinho de compras
                </ModalHeader>
                <ModalCloseButton color='white' />
                <ModalBody 
                    minH='150px' 
                    maxH='300px' 
                    overflowY='scroll'
                    sx={{
                        '&::-webkit-scrollbar': {
                          width: '6px',
                        },
                        '&::-webkit-scrollbar-track': {
                          width: '8px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                          background: 'grey.600',
                          borderRadius: '24px',
                        },
                    }}
                >
                    {cart.length > 0 ? ( 
                            cart.map(prod =>(
                                <Flex h='90px' p='10px 0' justifyContent='space-between' key={prod.name}>
                                    <Flex>
                                        <Center w='80px' h='80px' bg='grey.100' borderRadius='5px'>
                                            <Image src={prod.imageUrl} alt={prod.name} w='75px'/>
                                        </Center>
                                        <Stack h='80px' spacing='25px' ml='10px'>
                                            <Text 
                                                fontSize='18px' 
                                                fontWeight='700' 
                                                color='grey.600' 
                                                w={['160px', 'auto']}
                                                overflow='hidden'
                                                whiteSpace='nowrap'
                                                textOverflow='ellipsis'
                                            >
                                                {prod.name}
                                            </Text>
                                            <Flex h='34px' w='106px' bg='#F2F2F2' alignItems='center'>
                                                <Center cursor='pointer' w='30px' h='34px' fontSize='22px' color='red.secondary' onClick={() => removeOneItem(prod)}>-</Center>
                                                <Center w='46px' h='30px' bg='white'>{prod.quantity}</Center>
                                                <Center cursor='pointer' w='30px' h='34px' fontSize='22px' color='red.secondary' onClick={() => addOneItem(prod)}>+</Center>
                                            </Flex>
                                        </Stack>
                                    </Flex>
                                    <FaTrash size={20} color={theme.colors.grey[200]} onClick={() => removeItem(prod)} />
                                </Flex>
                            ))                           
                            
                            
                        ) : (
                            <Center flexDirection='column' h='150px'>
                                <Text fontSize='18px' fontWeight='700' color='grey.600'>
                                    Sua sacola está vazia
                                </Text>
                                <Text fontSize='14px' color='grey.400' mt='8px'>
                                    Adicione itens
                                </Text>
                            </Center>
                        )
                    }
                </ModalBody>

                {cart.length > 0 && (
                    <ModalFooter borderTop='2px solid' borderColor='grey.100' m='5px 10px'  p='5px 0'>
                        <Stack spacing='15px' w='100%'>
                            <Flex justifyContent='space-between'>
                                <Text fontSize='14px' fontWeight='600' color='grey.600'>Total</Text>
                                <Text fontSize='14px' fontWeight='600' color='grey.400'>
                                    {Intl.NumberFormat('pt-BR',{
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(cart.reduce((acc,elem) => acc + elem.quantity * elem.price,0))}
                                </Text>
                            </Flex>
                            <Button name='Remover todos'onClick={removeAll}/>
                            <Button isGreen name='Finalizar compra' onClick={concludePurchase
                            }/>
                        </Stack>
                    
                    </ModalFooter>
                )}
            </ModalContent>
        </Modal>
    )
}