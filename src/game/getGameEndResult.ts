export interface GameEndResult {
    player: string
    start: number[]
    end: number[]
}

export const getGameEndResult = (grid: string[][]): GameEndResult | null => {
    for (let i = 0; i < grid[0].length; i++) {
        for (let j = 0; j < grid.length; j++) {
            const player = getCellContent(i, j, grid)

            if (player === 'x' || player === 'o') {
                const result1 = getCountDown(i, j + 1, grid, player, {
                    coordinates: [],
                    count: 1,
                })
                const result12 = getCountDownRight(i + 1, j + 1, grid, player, {
                    coordinates: [],
                    count: 1,
                })
                const result13 = getCountDownLeft(i - 1, j + 1, grid, player, {
                    coordinates: [],
                    count: 1,
                })

                if (result1.count >= 5) {
                    return {
                        player,
                        start: [i, j],
                        end: result1.coordinates,
                    }
                }
                if (result12.count >= 5) {
                    return {
                        player,
                        start: [i, j],
                        end: result12.coordinates,
                    }
                }
                if (result13.count >= 5) {
                    return {
                        player,
                        start: [i, j],
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
    currentX: number,
    currentY: number,
    grid: string[][],
    player: string,
    result: CountResult,
): CountResult => {
    if (getCellContent(currentX, currentY, grid) === player) {
        return getCountDown(currentX, currentY + 1, grid, player, {
            coordinates: [currentX, currentY],
            count: result.count + 1,
        })
    }
    return result
}

const getCountDownLeft = (
    currentX: number,
    currentY: number,
    grid: string[][],
    player: string,
    result: CountResult,
): CountResult => {
    if (getCellContent(currentX, currentY, grid) === player) {
        return getCountDownLeft(currentX - 1, currentY + 1, grid, player, {
            coordinates: [currentX, currentY],
            count: result.count + 1,
        })
    }
    return result
}

const getCountDownRight = (
    currentX: number,
    currentY: number,
    grid: string[][],
    player: string,
    result: CountResult,
): CountResult => {
    if (getCellContent(currentX, currentY, grid) === player) {
        return getCountDownRight(currentX + 1, currentY + 1, grid, player, {
            coordinates: [currentX, currentY],
            count: result.count + 1,
        })
    }
    return result
}

const getCellContent = (
    currentX: number,
    currentY: number,
    grid: string[][],
): string => {
    if (currentX > grid[0].length || currentX < 0) {
        return ''
    }
    if (currentY > grid.length || currentY < 0) {
        return ''
    }
    return grid[currentY][currentX]
}
