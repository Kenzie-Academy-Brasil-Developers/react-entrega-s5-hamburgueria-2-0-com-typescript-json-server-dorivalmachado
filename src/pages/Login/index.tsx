import { Flex } from "@chakra-ui/react";

import { Header } from "../../components/Header";
import { FormLogin } from "./FormLogin";


export const Login = () => {
    return(
        <Flex 
            flexDirection={['column-reverse', 'column-reverse', 'column-reverse', 'row']} 
            justifyContent='center' 
            h={['auto', 'auto', 'auto', '100vh']} 
            align='center'
            padding={['30px 15px 20px', '30px 15px 20px', '30px 15px 20px', '0']}
        >
            <FormLogin/>
            <Header/>
            
        </Flex>
    )
}