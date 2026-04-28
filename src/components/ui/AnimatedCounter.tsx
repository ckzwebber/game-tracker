import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface AnimatedCounterProps {
  value: number
  decimals?: number
  className?: string
  duration?: number
}

export function AnimatedCounter({
  value,
  decimals = 0,
  className,
  duration = 1.5,
}: AnimatedCounterProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (reduced || !inView) return
    motionValue.set(value)
  }, [inView, reduced, motionValue, value])

  useEffect(() => {
    if (reduced) {
      setDisplay(value.toFixed(decimals))
      return
    }
    return spring.on('change', (v) => {
      setDisplay(v.toFixed(decimals))
    })
  }, [spring, decimals, reduced, value])

  return (
    <span ref={ref} className={className}>
      {inView || reduced ? display : '0'}
    </span>
  )
}
