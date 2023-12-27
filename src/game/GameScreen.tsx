import {SafeAreaView} from 'react-native'
import React, {useEffect, useState} from 'react'
import {getGameEndResult} from './getGameEndResult.ts'
import {COLUMNS, EMPTY_CELL, ROWS} from './constants.ts'
import GameHeader from './GameHeader.tsx'
import GameFooter from './GameFooter.tsx'
import GameGrid from './GameGrid.tsx'

export type player = 'x' | 'o'

export interface GameEndResult {
    winner: player
    start: number[]
    end: number[]
}

const initGame = (): string[][] => {
    const grid: string[][] = []

    for (let row = 0; row < ROWS; row++) {
        const row: string[] = []
        for (let column = 0; column < COLUMNS; column++) {
            row.push(EMPTY_CELL)
        }
        grid.push(row)
    }

    return grid
}

const GameScreen = (): React.JSX.Element => {
    const [grid, setGrid] = useState<string[][]>(initGame())
    const [turn, setTurn] = useState<player>('x')
    const [gameEndResult, setGameEndResult] = useState<GameEndResult | null>(
        null,
    )

    const onCellClick = (columnIndex: number, rowIndex: number) => {
        if (!gameEndResult && grid[rowIndex][columnIndex] === EMPTY_CELL) {
            const newGrid = grid.map(row => [...row])
            newGrid[rowIndex][columnIndex] = turn
            setGrid(newGrid)
            setTurn(turn === 'x' ? 'o' : 'x')
        }
    }

    const createNewGame = () => {
        setGrid(initGame)
        setGameEndResult(null)
    }

    useEffect(() => {
        const result = getGameEndResult(grid)
        if (result) {
            setGameEndResult(result)
        }
    }, [grid])

    return (
        <SafeAreaView>
            <GameHeader gameEndResult={gameEndResult} turn={turn}></GameHeader>
            <GameGrid
                grid={grid}
                onCellClick={onCellClick}
                gameEndResult={gameEndResult}></GameGrid>
            <GameFooter
                gameEndResult={gameEndResult}
                createNewGame={createNewGame}></GameFooter>
        </SafeAreaView>
    )
}

export default GameScreen
