import { Box, Heading, Text, VStack } from "@chakra-ui/react"

import { Button } from "../../components/Button"
import { Input } from "../../components/Input"


export const FormLogin = () => {
    return(
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
                <Input label="Senha" type='password' placeholder="Senha"/>
                <Button name="Logar" isGreen/>
                <Text fontSize='14px' textAlign='center' color='grey.200' w={['250px', '250px', '325px']}>Crie sua conta para saborear muitas delícias e matar sua fome!</Text>
                <Button name="Cadastrar"/>
            </VStack>

        </Box>
    )
}