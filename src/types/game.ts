export type GameStatus = 'completed' | 'playing' | 'dropped'

export interface GameEntry {
  id: string
  title: string
  cover: string
  hoursPlayed: number
  mainStoryProgress: number
  rating: number
  status: GameStatus
  platform: string
  startedAt: string
  finishedAt?: string
  tags: string[]
  notes?: string
}
