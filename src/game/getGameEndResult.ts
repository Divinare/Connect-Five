import {GameEndResult} from './types/GameEndResult.ts'
import {GameState} from './types/GameState.ts'
import {Player} from './GameScreen.tsx'
import {useEffect, useState} from 'react'

/**
 *
 * The idea here is to check for 5+ matches in every direction from the lastly played move. This should be the most optimal solution.
 */

export const useGameResult = (gameState: GameState) => {
    const [gameEndResult, setGameEndResult] = useState<GameEndResult | null>(
        null,
    )

    useEffect(() => {
        const result = getGameEndResult(gameState)
        setGameEndResult(result)
    }, [gameState])

    return gameEndResult
}
const getGameEndResult = (gameState: GameState): GameEndResult | null => {
    const {grid, lastMove} = gameState
    if (!lastMove) {
        return null
    }

    const left = getCount(
        grid,
        lastMove.player,
        lastMove.coordinates.y,
        lastMove.coordinates.x,
        0,
        -1,
        0,
    )
    const right = getCount(
        grid,
        lastMove.player,
        lastMove.coordinates.y,
        lastMove.coordinates.x,
        0,
        1,
        0,
    )
    if (left + right >= 4) {
        return {
            winner: lastMove.player,
            start: {
                x: lastMove.coordinates.x - left,
                y: lastMove.coordinates.y,
            },
            end: {
                x: lastMove.coordinates.x + right,
                y: lastMove.coordinates.y,
            },
        }
    }

    const top = getCount(
        grid,
        lastMove.player,
        lastMove.coordinates.y,
        lastMove.coordinates.x,
        -1,
        0,
        0,
    )
    const down = getCount(
        grid,
        lastMove.player,
        lastMove.coordinates.y,
        lastMove.coordinates.x,
        1,
        0,
        0,
    )
    if (top + down >= 4) {
        return {
            winner: lastMove.player,
            start: {
                x: lastMove.coordinates.x,
                y: lastMove.coordinates.y - top,
            },
            end: {
                x: lastMove.coordinates.x,
                y: lastMove.coordinates.y + down,
            },
        }
    }

    const topLeft = getCount(
        grid,
        lastMove.player,
        lastMove.coordinates.y,
        lastMove.coordinates.x,
        -1,
        -1,
        0,
    )
    const bottomRight = getCount(
        grid,
        lastMove.player,
        lastMove.coordinates.y,
        lastMove.coordinates.x,
        1,
        1,
        0,
    )

    if (topLeft + bottomRight >= 4) {
        return {
            winner: lastMove.player,
            start: {
                x: lastMove.coordinates.x - topLeft,
                y: lastMove.coordinates.y - topLeft,
            },
            end: {
                x: lastMove.coordinates.x + bottomRight,
                y: lastMove.coordinates.y + bottomRight,
            },
        }
    }

    const topRight = getCount(
        grid,
        lastMove.player,
        lastMove.coordinates.y,
        lastMove.coordinates.x,
        -1,
        1,
        0,
    )
    const bottomLeft = getCount(
        grid,
        lastMove.player,
        lastMove.coordinates.y,
        lastMove.coordinates.x,
        1,
        -1,
        0,
    )

    if (topRight + bottomLeft >= 4) {
        return {
            winner: lastMove.player,
            start: {
                x: lastMove.coordinates.x + topRight,
                y: lastMove.coordinates.y - topRight,
            },
            end: {
                x: lastMove.coordinates.x - bottomLeft,
                y: lastMove.coordinates.y + bottomLeft,
            },
        }
    }

    return null
}

const getCount = (
    grid: string[][],
    turn: Player,
    row: number,
    column: number,
    nextRow: number,
    nextColumn: number,
    count: number,
): number => {
    const currentRow = row + nextRow
    const currentColumn = column + nextColumn
    if (isOutsideGrid(grid, currentRow, currentColumn)) {
        return count
    }
    if (grid[currentRow][currentColumn] !== turn) {
        return count
    }
    return getCount(
        grid,
        turn,
        currentRow,
        currentColumn,
        nextRow,
        nextColumn,
        count + 1,
    )
}

const isOutsideGrid = (
    grid: string[][],
    rowIndex: number,
    columnIndex: number,
): boolean => {
    return rowIndex >= grid.length || columnIndex >= grid[rowIndex].length
}
