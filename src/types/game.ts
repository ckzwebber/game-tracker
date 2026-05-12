export type GameStatus = 'jogando' | 'concluido' | 'largado'

export const STATUS_LABELS: Record<GameStatus, string> = {
  jogando: 'Jogando',
  concluido: 'Concluído',
  largado: 'Largado',
}

export interface GameEntry {
  id: string
  appid: number | null
  title: string
  cover?: string
  hoursPlayed: number
  mainStoryProgress: number | null
  rating: number | null
  status: GameStatus
  platform: string
  tags: string[]
  notes?: string
}
