import type { CSSProperties, ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export function Container({ children, className = '', style }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full ${className}`}
      style={{
        maxWidth: '1400px',
        paddingLeft: 'clamp(1.5rem, 4vw, 4rem)',
        paddingRight: 'clamp(1.5rem, 4vw, 4rem)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
