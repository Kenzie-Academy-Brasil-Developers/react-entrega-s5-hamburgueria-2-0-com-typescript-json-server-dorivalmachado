import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react"
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

interface RegisterUser{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const FormSignUp = () => {

    const schema = yup.object().shape({
        name: yup.string().required('Campo obrigatório'),
        email: yup.string().required('Campo obrigatório').email('Email inválido'),
        password: yup.string().required('Campo obrigatório').min(6, 'Mínimo de 6 dígitos'),
        confirmPassword: yup.string().required('Campo obrigatório').oneOf(['password'], 'Senhas divergentes')
    })

    const {register, handleSubmit, formState: {errors}} = useForm<RegisterUser>({
        resolver: yupResolver(schema)
    })

    const handleRegister = (data: RegisterUser) => {
        console.log(data)
    }

    return(
        <Box 
            h='530px' 
            border='2px solid' 
            borderColor='gray.50' 
            padding='25px' 
            maxW='500px' 
            w='100%'
            borderRadius='5px'
        >
            <Flex justifyContent='space-between'>
                <Heading as='h2' fontSize='lg' textAlign='left' mb='30px' color='grey.600' fontWeight='bold'>Cadastro</Heading>
                <Text color='grey.300' fontSize='14px' textDecoration='underline'>
                    <Link to='/'>Retornar para o login</Link>
                </Text>
            </Flex>
            <VStack as='form' spacing='25px' onSubmit={handleSubmit(handleRegister)}>
                <Input label="Nome" placeholder="Nome" {...register('name')} />
                <Input label="Email" placeholder="Email" {...register('email')}/>
                <Input label="Senha" type='password' placeholder="Senha" {...register('password')}/>
                <Input label="Confirmar Senha" type='password' placeholder="Confirmar Senha" {...register('confirmPassword')}/>
                <Text>{errors.confirmPassword?.message}</Text>
                <Button type="submit" name="Cadastrar"/>
            </VStack>

        </Box>
    )
}