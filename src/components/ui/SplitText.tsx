import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface SplitTextProps {
  text: string
  className?: string
  charClassName?: string
  staggerDelay?: number
  initialDelay?: number
  mode?: 'chars' | 'words'
}

export function SplitText({
  text,
  className,
  charClassName,
  staggerDelay = 0.04,
  initialDelay = 0,
  mode = 'chars',
}: SplitTextProps) {
  const reduced = useReducedMotion()

  const items = mode === 'words' ? text.split(' ') : text.split('')

  if (reduced) {
    return <span className={className}>{text}</span>
  }

  return (
    <span className={className} aria-label={text}>
      {items.map((item, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className={`inline-block overflow-hidden ${mode === 'words' ? 'mr-[0.25em]' : ''}`}
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0% 0 0 0)' }}
          transition={{
            duration: 0.5,
            delay: initialDelay + i * staggerDelay,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <span className={charClassName}>
            {item === ' ' ? ' ' : item}
          </span>
        </motion.span>
      ))}
    </span>
  )
}
