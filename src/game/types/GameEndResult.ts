import {Player} from '../GameScreen.tsx'
import {Coordinates} from './Coordinates.ts'

export type GameEndResult = {
    winner: Player
    start: Coordinates
    end: Coordinates
}
