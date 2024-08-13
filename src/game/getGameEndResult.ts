import {GameEndResult} from './types/GameEndResult.ts'
import {GameState} from './types/GameState.ts'
import {Player} from './GameScreen.tsx'
import {useEffect, useState} from 'react'
import {Coordinate} from './types/Coordinate.ts'

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

    const leftCoordinates = getCount(
        grid,
        lastMove.player,
        lastMove.coordinates.y,
        lastMove.coordinates.x,
        0,
        -1,
        [],
    )
    const rightCoordinates = getCount(
        grid,
        lastMove.player,
        lastMove.coordinates.y,
        lastMove.coordinates.x,
        0,
        1,
        [],
    )
    if (leftCoordinates.length + rightCoordinates.length >= 4) {
        return {
            winner: lastMove.player,
            start: {
                x: lastMove.coordinates.x - leftCoordinates.length,
                y: lastMove.coordinates.y,
            },
            end: {
                x: lastMove.coordinates.x + rightCoordinates.length,
                y: lastMove.coordinates.y,
            },
            winningStreak: [
                ...leftCoordinates.concat(rightCoordinates),
                {
                    y: lastMove.coordinates.y,
                    x: lastMove.coordinates.x,
                },
            ],
        }
    }

    const topCoordinates = getCount(
        grid,
        lastMove.player,
        lastMove.coordinates.y,
        lastMove.coordinates.x,
        -1,
        0,
        [],
    )
    const downCoordinates = getCount(
        grid,
        lastMove.player,
        lastMove.coordinates.y,
        lastMove.coordinates.x,
        1,
        0,
        [],
    )
    if (topCoordinates.length + downCoordinates.length >= 4) {
        return {
            winner: lastMove.player,
            start: {
                x: lastMove.coordinates.x,
                y: lastMove.coordinates.y - topCoordinates.length,
            },
            end: {
                x: lastMove.coordinates.x,
                y: lastMove.coordinates.y + downCoordinates.length,
            },
            winningStreak: [
                ...topCoordinates.concat(downCoordinates),
                {
                    y: lastMove.coordinates.y,
                    x: lastMove.coordinates.x,
                },
            ],
        }
    }

    const topLeftCoordinates = getCount(
        grid,
        lastMove.player,
        lastMove.coordinates.y,
        lastMove.coordinates.x,
        -1,
        -1,
        [],
    )
    const bottomRightCoordinates = getCount(
        grid,
        lastMove.player,
        lastMove.coordinates.y,
        lastMove.coordinates.x,
        1,
        1,
        [],
    )

    if (topLeftCoordinates.length + bottomRightCoordinates.length >= 4) {
        return {
            winner: lastMove.player,
            start: {
                x: lastMove.coordinates.x - topLeftCoordinates.length,
                y: lastMove.coordinates.y - topLeftCoordinates.length,
            },
            end: {
                x: lastMove.coordinates.x + bottomRightCoordinates.length,
                y: lastMove.coordinates.y + bottomRightCoordinates.length,
            },
            winningStreak: [
                ...topLeftCoordinates.concat(bottomRightCoordinates),
                {
                    y: lastMove.coordinates.y,
                    x: lastMove.coordinates.x,
                },
            ],
        }
    }

    const topRightCoordinates = getCount(
        grid,
        lastMove.player,
        lastMove.coordinates.y,
        lastMove.coordinates.x,
        -1,
        1,
        [],
    )
    const bottomLeftCoordinates = getCount(
        grid,
        lastMove.player,
        lastMove.coordinates.y,
        lastMove.coordinates.x,
        1,
        -1,
        [],
    )

    if (topRightCoordinates.length + bottomLeftCoordinates.length >= 4) {
        return {
            winner: lastMove.player,
            start: {
                x: lastMove.coordinates.x + topRightCoordinates.length,
                y: lastMove.coordinates.y - topRightCoordinates.length,
            },
            end: {
                x: lastMove.coordinates.x - bottomLeftCoordinates.length,
                y: lastMove.coordinates.y + bottomLeftCoordinates.length,
            },
            winningStreak: [
                ...topRightCoordinates.concat(bottomLeftCoordinates),
                {
                    y: lastMove.coordinates.y,
                    x: lastMove.coordinates.x,
                },
            ],
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
    coordinates: Coordinate[],
): Coordinate[] => {
    const currentRow = row + nextRow
    const currentColumn = column + nextColumn
    if (isOutsideGrid(grid, currentRow, currentColumn)) {
        return coordinates
    }
    if (grid[currentRow][currentColumn] !== turn) {
        return coordinates
    }

    return getCount(
        grid,
        turn,
        currentRow,
        currentColumn,
        nextRow,
        nextColumn,
        [
            ...coordinates,
            {
                x: currentColumn,
                y: currentRow,
            },
        ],
    )
}

const isOutsideGrid = (
    grid: string[][],
    rowIndex: number,
    columnIndex: number,
): boolean => {
    return (
        rowIndex < 0 ||
        columnIndex < 0 ||
        rowIndex >= grid.length ||
        columnIndex >= grid[rowIndex].length
    )
}
