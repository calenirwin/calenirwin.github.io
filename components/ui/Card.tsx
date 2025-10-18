import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  const hoverStyles = hover ? 'hover:shadow-lg hover:scale-[1.02] transition-all duration-200' : ''

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${hoverStyles} ${className}`}>
      {children}
    </div>
  )
}
