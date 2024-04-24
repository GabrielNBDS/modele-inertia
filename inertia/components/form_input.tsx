import useError from '@/hooks/use_error'
import {
  FormControl as FC,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputProps,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

export default function FormInput({
  label,
  id,
  className,
  type,
  rightElement,
  ...props
}: InputProps & { label: string; rightElement?: ReactNode }) {
  const error = useError(id)
  const hasError = (error?.length ?? 0) > 0

  return (
    <FC isInvalid={hasError}>
      <HStack justify="space-between">
        <FormLabel htmlFor={id}>{label}</FormLabel>

        {rightElement}
      </HStack>
      <Input id={id} type={type ?? 'text'} name={id} {...props} />
      {hasError && <FormErrorMessage>{error}</FormErrorMessage>}
    </FC>
  )
}
