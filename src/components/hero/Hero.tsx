import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { AnimatedCounter } from '../ui/AnimatedCounter'
import { Container } from '../ui/Container'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import type { GameEntry } from '../../types/game'

interface HeroProps {
  games: GameEntry[]
}

interface StatBlockProps {
  label: string
  value: number
  decimals?: number
}

function StatBlock({ label, value, decimals = 0 }: StatBlockProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <span
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '11px',
          color: 'rgba(161,161,170,0.5)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          color: '#FAFAFA',
          fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
          lineHeight: 1,
        }}
      >
        <AnimatedCounter value={value} decimals={decimals} />
      </span>
    </div>
  )
}

const DIVIDER = (
  <div
    style={{
      width: '1px',
      alignSelf: 'stretch',
      background: 'rgba(39,39,42,0.6)',
      margin: '0 clamp(1.5rem, 3vw, 3.5rem)',
      flexShrink: 0,
    }}
  />
)

export function Hero({ games }: HeroProps) {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  const totalHours = games.reduce((acc, g) => acc + g.hoursPlayed, 0)
  const avgRating = games.reduce((acc, g) => acc + g.rating, 0) / games.length

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const titleY = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['0%', '15%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: reduced ? {} : { staggerChildren: 0.08, delayChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: reduced ? {} : { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ paddingTop: '96px', paddingBottom: '96px' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 55% at 50% 35%, rgba(99,102,241,0.09) 0%, transparent 68%)',
        }}
      />

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y: titleY, opacity: contentOpacity }}
        >
          <motion.div variants={itemVariants} style={{ marginBottom: '24px' }}>
            <h1
              className="text-gradient-hero select-none"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 800,
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                fontSize: 'clamp(4rem, 9vw, 8.75rem)',
              }}
            >
              YOUR
              <br />
              GAMES
            </h1>
          </motion.div>

          <motion.p
            variants={itemVariants}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '18px',
              fontWeight: 400,
              color: '#A1A1AA',
              maxWidth: '400px',
              marginBottom: 'clamp(3rem, 6vw, 6rem)',
            }}
          >
            A personal log of every game played, rated, and remembered.
          </motion.p>

          <motion.div
            variants={itemVariants}
            style={{ display: 'flex', alignItems: 'flex-start' }}
          >
            <StatBlock label="Jogos" value={games.length} />
            {DIVIDER}
            <StatBlock label="Horas" value={totalHours} />
            {DIVIDER}
            <StatBlock label="Média" value={avgRating} decimals={1} />
          </motion.div>
        </motion.div>
      </Container>

      <motion.div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '11px',
            color: 'rgba(161,161,170,0.4)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          scroll
        </span>
        <motion.div
          style={{
            width: '1px',
            height: '32px',
            transformOrigin: 'top',
            background: 'linear-gradient(to bottom, rgba(99,102,241,0.6), transparent)',
          }}
          animate={reduced ? {} : { scaleY: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        />
      </motion.div>

      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'rgba(39,39,42,0.5)',
          transformOrigin: 'left',
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </section>
  )
}
