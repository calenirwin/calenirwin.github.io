import Link from 'next/link'

interface TagProps {
  children: string
  variant?: 'teal' | 'coral' | 'gray'
  href?: string
  clickable?: boolean
}

export default function Tag({ children, variant = 'teal', href, clickable = false }: TagProps) {
  const variantStyles = {
    teal: 'bg-primary-teal/10 text-primary-teal border-primary-teal/20',
    coral: 'bg-primary-coral/10 text-primary-coral border-primary-coral/20',
    gray: 'bg-gray-100 text-gray-700 border-gray-200',
  }

  const baseClasses = `inline-block px-3 py-1 text-xs font-medium rounded-full border ${variantStyles[variant]}`

  // If href is provided or clickable is true, make it a link
  if (href || clickable) {
    const linkHref = href || `/tags/${encodeURIComponent(children)}`
    return (
      <Link
        href={linkHref}
        className={`${baseClasses} hover:opacity-80 transition-opacity cursor-pointer`}
      >
        {children}
      </Link>
    )
  }

  // Otherwise render as a span
  return (
    <span className={baseClasses}>
      {children}
    </span>
  )
}
