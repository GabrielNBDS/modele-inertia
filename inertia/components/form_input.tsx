import useError from '@/hooks/use_error'
import { FormControl as FC, FormErrorMessage, FormLabel, Input, InputProps } from '@chakra-ui/react'

export default function FormInput({
  label,
  id,
  className,
  type,
  ...props
}: InputProps & { label: string }) {
  const error = useError(id)
  const hasError = (error?.length ?? 0) > 0

  return (
    <FC isInvalid={hasError}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Input id={id} type={type ?? 'text'} name={id} {...props} />
      {hasError && <FormErrorMessage>{error}</FormErrorMessage>}
    </FC>
  )
}
