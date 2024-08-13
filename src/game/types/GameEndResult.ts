import {Player} from '../GameScreen.tsx'
import {Coordinate} from './Coordinate.ts'

export type GameEndResult = {
    winner: Player
    start: Coordinate
    end: Coordinate
    winningStreak: Coordinate[]
}
