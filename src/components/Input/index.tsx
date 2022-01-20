import { 
    FormControl, 
    InputGroup, 
    Input as ChakraInput, 
    InputProps as ChakraInputProps,
    FormLabel,
    FormErrorMessage
} from "@chakra-ui/react"
import { 
    forwardRef, 
    ForwardRefRenderFunction, 
    useCallback, 
    useEffect, 
    useState 
} from "react"
import { FieldError } from "react-hook-form"


interface InputProps extends ChakraInputProps{
    label?: string;
    error?: FieldError | null;
}

type InputVariationOptions = {
    [key: string]: string;
}

const inputVariation: InputVariationOptions = {
    standard: 'transparent',
    error: 'red.negative',
    success: 'green.success',
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({label, error, ...rest}, ref) => {

    const [variation, setVariation] = useState('standard');
    const [inputValue, setInputValue] = useState('');
    const [visibility, setVisibility] = useState(false);

    useEffect(() => {
        if(!!error){
            setVariation('error')
        }
    }, [error]);

    const handleBlur = useCallback(() => {
        if(!error && inputValue.length > 0){
            setVariation('success');
        }

        if(inputValue.length === 0){
            setVisibility(false);
        }
    }, [error, inputValue])

    const handleFocus = useCallback(() => {
        setVisibility(true);
        
    }, [inputValue])

    return(
        <FormControl isInvalid={!!error}>
            <InputGroup position='relative' display='flex' flexDirection='column'>
                {label && visibility && (
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
                <ChakraInput 
                    h='60px'
                    borderRadius='8px'
                    border='2px solid'
                    color='grey.600' 
                    bg={!!inputValue ? 'white' : 'grey.50'}
                    borderColor={inputVariation[variation]}
                    ref={ref}
                    onBlurCapture={handleBlur}
                    onFocusCapture={handleFocus}
                    onChangeCapture={(e) => setInputValue(e.currentTarget.value)}
                    _focus={{borderColor: 'grey.600'}}
                    _hover={{borderColor: 'blue.information'}}
                    {...rest} 
                />
                {!!error && (
                    <FormErrorMessage color="red.negative">{error.message}</FormErrorMessage>
                )}
            </InputGroup>
        </FormControl>
    )
}

export const Input = forwardRef(InputBase)