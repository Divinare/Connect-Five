import {Player} from '../GameScreen.tsx'
import {Coordinate} from './Coordinate.ts'

export type Move = {
    player: Player
    coordinates: Coordinate
}
