import {Button as ChakraButton, ButtonProps as ChakraButtonProps} from '@chakra-ui/react';
import { theme } from '../../styles/theme';

interface ButtonProps extends ChakraButtonProps{
    name: string;
    isMedium?: boolean;
    isGreen?: boolean;
}

export const Button = ({name, isMedium = false, isGreen = false, ...rest}: ButtonProps) => {
    return(
        <ChakraButton 
            h={isMedium ? '40px' : '60px'}
            w={isMedium ? '105px' : '100%'}
            color={!isGreen ? theme.colors.grey[300] : 'white'}
            bg={isGreen ? theme.colors.green.primary : theme.colors.grey[100]}
            _hover={isGreen 
                ? {bgColor: 'green.primary-50'}
                : {bgColor: 'grey.300', color: theme.colors.grey[100]}
            }
            {...rest}
        >
            {name}
        </ChakraButton>
    )
}