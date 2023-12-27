import {GameEndResult} from './GameScreen.tsx'

export const getGameEndResult = (grid: string[][]): GameEndResult | null => {
    for (let row = 0; row < grid.length; row++) {
        for (let column = 0; column < grid[0].length; column++) {
            const player = getCellContent(column, row, grid)

            if (player === 'x' || player === 'o') {
                const result1 = getCountDown(column, row + 1, grid, player, {
                    coordinates: [],
                    count: 1,
                })
                const result12 = getCountDownRight(
                    column + 1,
                    row + 1,
                    grid,
                    player,
                    {
                        coordinates: [],
                        count: 1,
                    },
                )
                const result13 = getCountDownLeft(
                    column - 1,
                    row + 1,
                    grid,
                    player,
                    {
                        coordinates: [],
                        count: 1,
                    },
                )

                if (result1.count >= 5) {
                    return {
                        winner: player,
                        start: [row, column],
                        end: result1.coordinates,
                    }
                }
                if (result12.count >= 5) {
                    return {
                        winner: player,
                        start: [row, column],
                        end: result12.coordinates,
                    }
                }
                if (result13.count >= 5) {
                    return {
                        winner: player,
                        start: [row, column],
                        end: result13.coordinates,
                    }
                }
            }
        }
    }
    return null
}

interface CountResult {
    count: number
    coordinates: number[]
}

const getCountDown = (
    column: number,
    row: number,
    grid: string[][],
    player: string,
    result: CountResult,
): CountResult => {
    if (getCellContent(column, row, grid) === player) {
        return getCountDown(column, row + 1, grid, player, {
            coordinates: [row, column],
            count: result.count + 1,
        })
    }
    return result
}

const getCountDownLeft = (
    column: number,
    row: number,
    grid: string[][],
    player: string,
    result: CountResult,
): CountResult => {
    if (getCellContent(column, row, grid) === player) {
        return getCountDownLeft(column - 1, row + 1, grid, player, {
            coordinates: [row, column],
            count: result.count + 1,
        })
    }
    return result
}

const getCountDownRight = (
    column: number,
    row: number,
    grid: string[][],
    player: string,
    result: CountResult,
): CountResult => {
    if (getCellContent(column, row, grid) === player) {
        return getCountDownRight(column + 1, row + 1, grid, player, {
            coordinates: [row, column],
            count: result.count + 1,
        })
    }
    return result
}

const getCellContent = (
    column: number,
    row: number,
    grid: string[][],
): string => {
    if (column > grid[0].length || column < 0) {
        return ''
    }
    if (row > grid.length || row < 0) {
        return ''
    }
    return grid[row][column]
}
