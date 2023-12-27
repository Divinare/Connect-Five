import {GameEndResult, Player} from './GameScreen.tsx'

const hasWinningStreak = (slice: string[]): boolean => {
    return (
        slice.every(cell => cell === 'x') || slice.every(cell => cell === 'o')
    )
}

export const getGameEndResult = (grid: string[][]): GameEndResult | null => {
    const rows = grid.length
    const columns = grid[0].length

    // Check rows
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col <= columns - 5; col++) {
            const slice = grid[row].slice(col, col + 5)
            if (hasWinningStreak(slice)) {
                return {
                    winner: slice[0] as Player,
                    start: [row, col],
                    end: [row, col + 4],
                }
            }
        }
    }

    // Check columns
    for (let col = 0; col < columns; col++) {
        for (let row = 0; row <= rows - 5; row++) {
            const slice = Array.from({length: 5}, (_, i) => grid[row + i][col])
            if (hasWinningStreak(slice)) {
                return {
                    winner: slice[0] as Player,
                    start: [row, col],
                    end: [row + 4, col],
                }
            }
        }
    }

    // Check diagonals
    for (let row = 0; row <= rows - 5; row++) {
        for (let col = 0; col <= columns - 5; col++) {
            const slice = Array.from(
                {length: 5},
                (_, i) => grid[row + i][col + i],
            )
            if (hasWinningStreak(slice)) {
                return {
                    winner: slice[0] as Player,
                    start: [row, col],
                    end: [row + 4, col + 4],
                }
            }
        }
    }

    // Check diagonals
    for (let row = 0; row <= rows - 5; row++) {
        for (let col = columns - 1; col >= 4; col--) {
            const slice = Array.from(
                {length: 5},
                (_, i) => grid[row + i][col - i],
            )
            if (hasWinningStreak(slice)) {
                return {
                    winner: slice[0] as Player,
                    start: [row, col],
                    end: [row + 4, col - 4],
                }
            }
        }
    }

    return null
}
