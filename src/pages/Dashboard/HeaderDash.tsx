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
import { theme } from "../../styles/theme";



export const HeaderDash = () => {

    const [items, setItems] = useState(0);
    // const [items, setItems] = useState(JSON.parse(localStorage.getItem('@Hamburgueria:cart')).products.length || 0);
    
    const [showSearch, setShowSearch] = useState(false);

    
    const {signOut} = useAuth();

    const isWideScreen = useBreakpointValue({base: false, md: true});

    useEffect(() => {
        if(isWideScreen){
            setShowSearch(false);
        }
    }, [isWideScreen]);


    const handleSearch = () => {
        setShowSearch(false)
    }

    return(
        <Flex h='80px' w='100%' bg='grey.50' justifyContent='center' padding='10px 20px'>
            {showSearch ? (
                    <InputGroup w='365px'>
                        <Input 
                            w='100%' 
                            h='60px'
                            bg='white'
                            color='grey.400'
                            _placeholder={{color: 'grey.100'}}
                            placeholder="Digitar pesquisa"
                            borderRadius='8px'
                            border='2px solid'
                            borderColor='grey.100'
                            _focus={{borderColor: 'grey.600'}}
                            onBlurCapture={() => setShowSearch(false)}
                        />
                        <InputRightElement w='50px' h='40px'  mt='2.5' mr='2.5'>
                            <Button 
                                borderRadius='8px' 
                                bg='green.primary' 
                                w='100%' 
                                h='100%' 
                                _hover={{bg: 'green.primary-50'}}
                                onClick={handleSearch}
                            >
                                <FaSearch color="white" />
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                ) : (
                    <Flex justifyContent='space-between' alignItems='center' w='100%' maxW='1360px'>
                        <Image src={logo} alt='Logo Burguer Kenzie' w='159px' h='37px'/>
                        <Flex w={['100px', '100px', '465px']} justifyContent='space-between' alignItems='center'>
                            {isWideScreen ? (
                                    <InputGroup w='365px'>
                                        <Input 
                                            w='100%' 
                                            h='60px'
                                            bg='white'
                                            color='grey.400'
                                            _placeholder={{color: 'grey.100'}}
                                            placeholder="Digitar pesquisa"
                                            borderRadius='8px'
                                            border='2px solid'
                                            borderColor='grey.100'
                                            _focus={{borderColor: 'grey.600'}}
                                        />
                                        <InputRightElement w='50px' h='40px'  mt='2.5' mr='2.5'>
                                            <Button 
                                                borderRadius='8px' 
                                                bg='green.primary' 
                                                w='100%' 
                                                h='100%' 
                                                _hover={{bg: 'green.primary-50'}}
                                                onClick={handleSearch}
                                            >
                                                <FaSearch color="white" />
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                ) : (
                                    <FaSearch color={theme.colors.grey[200]} size={25} cursor='pointer' onClick={() => setShowSearch(true)} />
                                )
                            }
                            <Box position='relative'  cursor='pointer'>
                                <Center 
                                    position='absolute' 
                                    bottom='15px'
                                    left='15px'
                                    w='20px' 
                                    h='25px' 
                                    borderRadius='7px'
                                    bg='green.primary'
                                    color='white'
                                    fontSize='14px'
                                    fontWeight='bold'
                                >
                                    {items}
                                </Center>
                                <FaShoppingCart color={theme.colors.grey[200]} size={25}/>
                            </Box>
                            <MdOutlineLogout color={theme.colors.grey[200]} size={25} onClick={signOut}  cursor='pointer'/>
                        </Flex>
                    </Flex>
                )
            }
            
        </Flex>
    )
}