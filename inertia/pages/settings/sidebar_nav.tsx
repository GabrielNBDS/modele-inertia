import { Button } from '@/components/button'
import { cn } from '@/lib/utils'
import { Link } from '@inertiajs/react'

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    icon: JSX.Element
    href: string
    title: string
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const { pathname } = window.location

  return (
    <nav
      className={cn('flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1', className)}
      {...props}
    >
      {items.map((item) => (
        <Button asChild variant="ghost">
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              '!justify-start gap-2',
              pathname === item.href
                ? 'bg-muted hover:bg-muted'
                : 'hover:bg-transparent hover:underline'
            )}
          >
            {item.icon}
            {item.title}
          </Link>
        </Button>
      ))}
    </nav>
  )
}
