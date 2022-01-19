import { 
    Box, 
    Center, 
    Flex, 
    Heading, 
    Image, 
    Text, 
    VStack 
} from "@chakra-ui/react";
import {FiShoppingBag} from 'react-icons/fi'

import { Input } from "../components/Input";
import logo from '../assets/logo.svg';
import { Button } from "../components/Button";
import { theme } from "../styles/theme";


export const Login = () => {
    return(
        <Flex 
            flexDirection={['column-reverse', 'column-reverse', 'column-reverse', 'row']} 
            justifyContent='center' 
            h={['auto', 'auto', 'auto', '100vh']} 
            align='center'
            padding={['30px 15px 20px', '30px 15px 20px', '30px 15px 20px', '0']}
        >
            <Box 
                h='461px' 
                border='2px solid' 
                borderColor='gray.50' 
                padding='25px' 
                maxW='500px' 
                w='100%'
                borderRadius='5px'
            >
                <Heading as='h2' fontSize='lg' textAlign='left' mb='19px' color='grey.600' fontWeight='bold'>Login</Heading>
                <VStack as='form' spacing='20px'>
                    <Input label="Email" placeholder="Email"/>
                    <Input label="Senha" placeholder="Senha"/>
                    <Button name="Logar" isGreen/>
                    <Text fontSize='14px' textAlign='center' color='grey.200' w={['250px', '250px', '325px']}>Crie sua conta para saborear muitas delícias e matar sua fome!</Text>
                    <Button name="Cadastrar"/>
                </VStack>

            </Box>
                
            <Box 
                pl={['0', '0', '0', '60px']} 
                h={['auto','auto','auto','300px']} 
                maxW='500px' 
                w='100%'
                mb={['15px', '15px', '15px', '0']}
                
            >
                <Image src={logo} alt='Logo Burguer Kenzie' w='245px' mb='22px'/>
                <Flex 
                    w='100%' 
                    maxW='380px' 
                    h='95px' 
                    border='1px solid' 
                    borderColor='grey.100'
                    borderRadius='5px'
                    justifyContent='center'
                    alignItems='center'
                    ml='5px'
                    padding='5px'
                >
                    <Center 
                        bg='rgba(39, 174, 96, 0.1)' 
                        w='60px' 
                        h='60px'
                        borderRadius='5px'
                        mr='15px'
                    >
                        <FiShoppingBag color={theme.colors.green.primary} />
                    </Center>
                    <Text 
                        w={['210px', '260px']}
                        fontSize='14px'
                        fontWeight='500'
                        h='65px'
                    >
                        A vida é como um sanduíche, é preciso recheá-lo com os <b>melhores</b> ingredientes.
                    </Text>
                </Flex>
            </Box>
        </Flex>
    )
}