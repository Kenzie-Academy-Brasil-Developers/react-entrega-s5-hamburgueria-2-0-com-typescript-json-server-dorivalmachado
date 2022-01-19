import { Flex } from "@chakra-ui/react";

import { Header } from "../../components/Header";
import { FormSignUp } from "./FormSignUp";


export const SignUp = () => {
    return(
        <Flex 
            flexDirection={['column', 'column', 'column', 'row']} 
            justifyContent='center' 
            h={['auto', 'auto', 'auto', '100vh']} 
            align='center'
            padding={['30px 15px 20px', '30px 15px 20px', '30px 15px 20px', '0']}
        >

            <Header/>
            <FormSignUp/>
            
        </Flex>
    )
}