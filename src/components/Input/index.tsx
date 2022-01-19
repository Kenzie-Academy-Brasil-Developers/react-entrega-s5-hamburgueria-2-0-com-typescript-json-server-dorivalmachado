import { 
    FormControl, 
    InputGroup, 
    Input as ChakraInput, 
    InputProps as ChakraInputProps,
    FormLabel
} from "@chakra-ui/react"


interface InputProps extends ChakraInputProps{
    label?: string;
}

export const Input = ({label, ...rest}: InputProps) => {
    return(
        <FormControl>
            <InputGroup position='relative'>
                {label && (
                    <FormLabel 
                        position='absolute'
                        top='-10px'
                        left='20px'
                        zIndex='2'
                        bg='white'
                        m='0'
                        p='0 3px'
                        fontSize='12px'
                        color='grey.200'
                    >
                        {label}
                    </FormLabel>
                )}
                <ChakraInput h='60px' {...rest} />
            </InputGroup>
        </FormControl>
    )
}