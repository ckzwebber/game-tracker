import { motion } from 'framer-motion'
import { Container } from '../ui/Container'

export function Navbar() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-30"
      style={{
        height: '48px',
        borderBottom: '1px solid rgba(39,39,42,0.5)',
        background: 'rgba(10,10,11,0.85)',
        backdropFilter: 'blur(12px)',
      }}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Container className="h-full flex items-center justify-between">
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: 'rgba(161,161,170,0.6)', letterSpacing: '0.05em' }}>
          game-tracker
        </span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: 'rgba(161,161,170,0.4)', letterSpacing: '0.05em' }}>
          carlos miguel
        </span>
      </Container>
    </motion.header>
  )
}
