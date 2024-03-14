import * as React from 'react'

import { cn } from '@/lib/utils'
import useError from '@/hooks/use_error'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const error = useError(props.id)

    return (
      <>
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
        {(error?.length ?? 0) > 0 && (
          <p className="text-[0.8rem] font-medium text-destructive">{error}</p>
        )}
      </>
    )
  }
)
Input.displayName = 'Input'

export { Input }
