import {Move} from './Move.ts'
import {Player} from '../GameScreen.tsx'

export type GameState = {
    grid: string[][]
    currentTurn: Player
    lastMove: Move | null
}
