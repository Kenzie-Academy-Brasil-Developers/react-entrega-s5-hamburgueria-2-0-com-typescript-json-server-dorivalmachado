import { 
    Box, 
    Center, 
    Flex, 
    Image, 
    Text
} from "@chakra-ui/react"
import { FiShoppingBag } from "react-icons/fi";

import logo from '../../assets/logo.svg';
import { theme } from "../../styles/theme";


export const Header = () => {
    return(
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
                    w='70px' 
                    h='70px'
                    borderRadius='5px'
                    mr='15px'
                >
                    <FiShoppingBag color={theme.colors.green.primary} />
                </Center>
                <Text 
                    w='260px'
                    fontSize='14px'
                    fontWeight='500'
                    h='75px'
                >
                    A vida é como um sanduíche, é preciso recheá-la com os <b>melhores</b> ingredientes.
                </Text>
            </Flex>
        </Box>
    )
}