import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { GameCard } from './GameCard'
import { Container } from '../ui/Container'
import type { GameEntry, GameStatus } from '../../types/game'

type FilterOption = 'all' | GameStatus
type SortOption = 'rating' | 'hours' | 'recent'

const FILTERS: { value: FilterOption; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'playing', label: 'Playing' },
  { value: 'completed', label: 'Completed' },
  { value: 'dropped', label: 'Dropped' },
]

const SORTS: { value: SortOption; label: string }[] = [
  { value: 'rating', label: 'Rating' },
  { value: 'hours', label: 'Hours' },
  { value: 'recent', label: 'Recent' },
]

interface GameGridProps {
  games: GameEntry[]
  onGameClick: (game: GameEntry) => void
}

export function GameGrid({ games, onGameClick }: GameGridProps) {
  const [filter, setFilter] = useState<FilterOption>('all')
  const [sort, setSort] = useState<SortOption>('rating')
  const [sortAsc, setSortAsc] = useState(false)

  const filtered = useMemo(() => {
    let list = filter === 'all' ? games : games.filter((g) => g.status === filter)
    list = [...list].sort((a, b) => {
      let diff = 0
      if (sort === 'rating') diff = b.rating - a.rating
      if (sort === 'hours') diff = b.hoursPlayed - a.hoursPlayed
      if (sort === 'recent') diff = b.startedAt.localeCompare(a.startedAt)
      return sortAsc ? -diff : diff
    })
    return list
  }, [games, filter, sort, sortAsc])

  const handleSortClick = (value: SortOption) => {
    if (sort === value) {
      setSortAsc((p) => !p)
    } else {
      setSort(value)
      setSortAsc(false)
    }
  }

  return (
    <section style={{ paddingBottom: '128px' }}>
      <Container>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            paddingTop: 'clamp(3rem, 6vw, 6rem)',
            paddingBottom: '16px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <nav
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              aria-label="Filter games"
            >
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  style={{
                    padding: '6px 16px',
                    borderRadius: '9999px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: filter === f.value ? '#111113' : 'transparent',
                    color: filter === f.value ? '#FAFAFA' : '#A1A1AA',
                    border: filter === f.value ? '1px solid rgba(39,39,42,0.8)' : '1px solid transparent',
                  }}
                >
                  {f.label}
                </button>
              ))}
            </nav>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '12px',
                color: 'rgba(161,161,170,0.5)',
              }}
            >
              <span style={{ marginRight: '8px', letterSpacing: '0.05em' }}>Sort</span>
              {SORTS.map((s) => (
                <button
                  key={s.value}
                  onClick={() => handleSortClick(s.value)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'color 0.15s ease',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '12px',
                    color: sort === s.value ? '#FAFAFA' : 'rgba(161,161,170,0.5)',
                    background: 'transparent',
                    border: 'none',
                    letterSpacing: '0.03em',
                  }}
                >
                  {s.label}
                  {sort === s.value && (
                    <span style={{ marginLeft: '4px', color: '#6366F1' }}>
                      {sortAsc ? '↑' : '↓'}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <motion.p
            key={`${filter}-${filtered.length}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '12px',
              color: 'rgba(161,161,170,0.35)',
              letterSpacing: '0.05em',
              marginTop: '4px',
            }}
          >
            {filtered.length} {filtered.length === 1 ? 'game' : 'games'}
          </motion.p>
        </div>

        <div style={{ height: '1px', background: 'rgba(39,39,42,0.5)', marginBottom: '0' }} />

        <div>
          {filtered.map((game, i) => (
            <GameCard key={game.id} game={game} index={i} onClick={onGameClick} />
          ))}
        </div>
      </Container>
    </section>
  )
}
