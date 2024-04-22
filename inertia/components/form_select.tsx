import useError from '@/hooks/use_error'
import {
  FormControl as FC,
  FormErrorMessage,
  FormLabel,
  Select,
  SelectProps,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

export default function FormSelect({
  label,
  id,
  className,
  children,
  ...props
}: SelectProps & { label: string; children: ReactNode }) {
  const error = useError(id)
  const hasError = (error?.length ?? 0) > 0

  return (
    <FC isInvalid={hasError}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Select id={id} name={id} {...props}>
        {children}
      </Select>
      {hasError && <FormErrorMessage>{error}</FormErrorMessage>}
    </FC>
  )
}
