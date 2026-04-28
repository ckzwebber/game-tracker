import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function CursorFollower() {
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  const springX = useSpring(0, { stiffness: 180, damping: 28 })
  const springY = useSpring(0, { stiffness: 180, damping: 28 })

  useEffect(() => {
    if (reduced) return
    const isMobile = window.matchMedia('(pointer: coarse)').matches
    if (isMobile) return

    const onMove = (e: MouseEvent) => {
      springX.set(e.clientX)
      springY.set(e.clientY)
      setVisible(true)

      const el = e.target as HTMLElement
      setHovering(
        el.tagName === 'BUTTON' ||
        el.tagName === 'A' ||
        el.closest('button') !== null ||
        el.closest('a') !== null ||
        el.getAttribute('role') === 'button',
      )
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', () => setVisible(false))
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', () => setVisible(false))
    }
  }, [reduced, springX, springY])

  if (reduced) return null

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
    >
      <motion.div
        animate={{
          opacity: visible ? 1 : 0,
          width: hovering ? 32 : 12,
          height: hovering ? 32 : 12,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="rounded-full"
        style={{
          background: 'rgba(99, 102, 241, 0.35)',
          filter: 'blur(3px)',
        }}
      />
    </motion.div>
  )
}
