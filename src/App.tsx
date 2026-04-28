import { useState, useEffect } from 'react'
import Lenis from 'lenis'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/hero/Hero'
import { GameGrid } from './components/games/GameGrid'
import { GameModal } from './components/games/GameModal'
import { CursorFollower } from './components/ui/CursorFollower'
import gamesData from './data/games.json'
import type { GameEntry } from './types/game'

const games = gamesData.games as GameEntry[]

export default function App() {
  const [selectedGame, setSelectedGame] = useState<GameEntry | null>(null)

  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true, duration: 1.2 })
    let rafId: number

    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen bg-bg grain">
      <Navbar />
      <main className="pt-12">
        <Hero games={games} />
        <GameGrid games={games} onGameClick={setSelectedGame} />
      </main>
      <Footer />
      <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
      <CursorFollower />
    </div>
  )
}
