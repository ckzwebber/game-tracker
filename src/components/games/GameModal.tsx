import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { AnimatedCounter } from '../ui/AnimatedCounter'
import type { GameEntry } from '../../types/game'

interface GameModalProps {
  game: GameEntry | null
  onClose: () => void
}

const STATUS_LABEL: Record<string, string> = {
  completed: 'Completed',
  playing: 'Playing',
  dropped: 'Dropped',
}

function formatDate(dateStr: string) {
  const [year, month] = dateStr.split('-')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[parseInt(month, 10) - 1]} ${year}`
}

export function GameModal({ game, onClose }: GameModalProps) {
  const reduced = useReducedMotion()
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!game) return
    closeBtnRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [game, onClose])

  useEffect(() => {
    document.body.style.overflow = game ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [game])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <AnimatePresence>
      {game && (
        <>
          <motion.div
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          <motion.div
            className="fixed inset-0 z-50 overflow-y-auto"
            style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 'clamp(1rem, 4vw, 3rem)' }}
            onClick={handleBackdropClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              ref={containerRef}
              role="dialog"
              aria-modal="true"
              aria-label={game.title}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '900px',
                background: '#111113',
                borderRadius: '20px',
                border: '1px solid rgba(39,39,42,0.6)',
                overflow: 'hidden',
                position: 'relative',
                marginTop: 'auto',
                marginBottom: 'auto',
              }}
              initial={reduced ? {} : { opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                ref={closeBtnRef}
                onClick={onClose}
                aria-label="Close"
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  zIndex: 10,
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(10,10,11,0.7)',
                  border: '1px solid rgba(39,39,42,0.7)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  color: 'rgba(161,161,170,0.7)',
                  transition: 'color 0.15s ease, border-color 0.15s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#FAFAFA'
                  e.currentTarget.style.borderColor = 'rgba(99,102,241,0.6)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'rgba(161,161,170,0.7)'
                  e.currentTarget.style.borderColor = 'rgba(39,39,42,0.7)'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>

              <div style={{ position: 'relative', width: '100%', height: 'clamp(220px, 35vw, 360px)', overflow: 'hidden' }}>
                <img
                  src={game.cover}
                  alt={game.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, #111113 0%, rgba(17,17,19,0.4) 50%, transparent 100%)',
                }} />
              </div>

              <div style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
                <h2
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontWeight: 700,
                    color: '#FAFAFA',
                    fontSize: 'clamp(1.75rem, 5vw, 3rem)',
                    lineHeight: 1.05,
                    letterSpacing: '-0.02em',
                    marginBottom: '12px',
                  }}
                >
                  {game.title}
                </h2>

                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px 10px', marginBottom: '32px' }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: 'rgba(161,161,170,0.55)' }}>
                    {game.platform}
                  </span>
                  <span style={{ color: 'rgba(161,161,170,0.3)', fontSize: '12px' }}>·</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: 'rgba(161,161,170,0.55)' }}>
                    {STATUS_LABEL[game.status]}
                  </span>
                  {game.id && (
                    <>
                      <span style={{ color: 'rgba(161,161,170,0.3)', fontSize: '12px' }}>·</span>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: 'rgba(161,161,170,0.35)' }}>
                        {game.id}
                      </span>
                    </>
                  )}
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1px',
                    background: 'rgba(39,39,42,0.5)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    marginBottom: '28px',
                  }}
                >
                  <div style={{ background: '#111113', padding: 'clamp(1rem, 2.5vw, 1.25rem)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'rgba(161,161,170,0.45)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Hours
                    </span>
                    <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600, fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', color: '#FAFAFA', lineHeight: 1 }}>
                      <AnimatedCounter value={game.hoursPlayed} />
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: 'rgba(161,161,170,0.45)', marginLeft: '4px' }}>h</span>
                    </span>
                  </div>

                  <div style={{ background: '#111113', padding: 'clamp(1rem, 2.5vw, 1.25rem)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'rgba(161,161,170,0.45)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Rating
                    </span>
                    <span
                      className={game.rating >= 9 ? 'text-gradient-accent' : ''}
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontWeight: 600,
                        fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                        color: game.rating >= 9 ? undefined : '#FAFAFA',
                        lineHeight: 1,
                      }}
                    >
                      <AnimatedCounter value={game.rating} decimals={1} />
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: 'rgba(161,161,170,0.45)', marginLeft: '4px' }}>/10</span>
                    </span>
                  </div>

                  <div style={{ background: '#111113', padding: 'clamp(1rem, 2.5vw, 1.25rem)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'rgba(161,161,170,0.45)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Progress
                    </span>
                    {game.mainStoryProgress > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600, fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', color: '#FAFAFA', lineHeight: 1 }}>
                          {game.mainStoryProgress}
                          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: 'rgba(161,161,170,0.45)', marginLeft: '2px' }}>%</span>
                        </span>
                        <div style={{ height: '2px', background: 'rgba(39,39,42,0.8)', borderRadius: '2px', overflow: 'hidden' }}>
                          <motion.div
                            style={{ height: '100%', background: 'linear-gradient(to right, #6366F1, #8B5CF6)', borderRadius: '2px' }}
                            initial={{ width: '0%' }}
                            animate={{ width: `${game.mainStoryProgress}%` }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </div>
                      </div>
                    ) : (
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: 'rgba(161,161,170,0.3)', lineHeight: 1.5 }}>
                        N/A
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: game.notes || game.startedAt ? '28px' : '0' }}>
                  {game.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '11px',
                        color: 'rgba(161,161,170,0.6)',
                        padding: '5px 12px',
                        borderRadius: '999px',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(39,39,42,0.7)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {game.notes && (
                  <div
                    style={{
                      padding: '20px',
                      background: 'rgba(255,255,255,0.025)',
                      borderRadius: '12px',
                      border: '1px solid rgba(39,39,42,0.5)',
                      marginBottom: game.startedAt ? '20px' : '0',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontSize: '14px',
                        color: 'rgba(161,161,170,0.75)',
                        lineHeight: 1.75,
                        margin: 0,
                      }}
                    >
                      {game.notes}
                    </p>
                  </div>
                )}

                {(game.startedAt || game.finishedAt) && (
                  <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                    {game.startedAt && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'rgba(161,161,170,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                          Started
                        </span>
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: 'rgba(161,161,170,0.55)' }}>
                          {formatDate(game.startedAt)}
                        </span>
                      </div>
                    )}
                    {game.finishedAt && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'rgba(161,161,170,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                          Finished
                        </span>
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: 'rgba(161,161,170,0.55)' }}>
                          {formatDate(game.finishedAt)}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
