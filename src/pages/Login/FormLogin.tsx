import { Box, Heading, Text, VStack } from "@chakra-ui/react"
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface LoginUser{
    email: string;
    password: string;
}

export const FormLogin = () => {

    const history = useHistory();

    const {signIn} = useAuth();

    const schema = yup.object().shape({
        email: yup.string().required('Campo obrigatório').email('Email inválido'),
        password: yup.string().required('Campo obrigatório').min(6, 'Mínimo de 6 dígitos'),
    });

    const {register, handleSubmit, formState: {errors}} = useForm<LoginUser>({
        resolver: yupResolver(schema)
    });

    const handleLogin = (data: LoginUser) => {
        signIn(data);
    }

    return(
        <Box 
            h='auto'
            minH='461px' 
            border='2px solid' 
            borderColor='gray.50' 
            padding='25px' 
            maxW='500px' 
            w='100%'
            borderRadius='5px'
        >
            <Heading as='h2' fontSize='lg' textAlign='left' mb='19px' color='grey.600' fontWeight='bold'>Login</Heading>
            <VStack as='form' spacing='20px' onSubmit={handleSubmit(handleLogin)}>
                <Input label="Email" error={errors.email} placeholder="Email" {...register('email')}/>
                <Input label="Senha" error={errors.password} type='password' placeholder="Senha" {...register('password')}/>
                <Button type='submit' name="Logar" isGreen/>
                <Text fontSize='14px' textAlign='center' color='grey.400' w={['250px', '250px', '325px']}>Crie sua conta para saborear muitas delícias e matar sua fome!</Text>
                <Button onClick={() => history.push('/register')} name="Cadastrar"/>
            </VStack>

        </Box>
    )
}