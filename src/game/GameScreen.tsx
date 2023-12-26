import {SafeAreaView} from 'react-native'
import React, {useEffect, useState} from 'react'
import {getGameEndResult} from './getGameEndResult.ts'
import GameGrid from './GameGrid.tsx'
import {COLUMNS, EMPTY_CELL, ROWS} from './constants.ts'
import GameHeader from './GameHeader.tsx'
import GameFooter from './GameFooter.tsx'

export type player = 'x' | 'o'

const initGame = (): string[][] => {
    const grid: string[][] = []

    for (let i = 0; i < ROWS; i++) {
        const row: string[] = []
        for (let j = 0; j < COLUMNS; j++) {
            row.push(EMPTY_CELL)
        }
        grid.push(row)
    }

    return grid
}

const GameScreen = (): React.JSX.Element => {
    const [grid, setGrid] = useState<string[][]>(initGame())
    const [turn, setTurn] = useState<player>('x')
    const [gameWinner, setGameWinner] = useState<string | null>(null)

    const onCellClick = (columnIndex: number, rowIndex: number) => {
        if (!gameWinner && grid[columnIndex][rowIndex] === EMPTY_CELL) {
            const newGrid = grid.map(row => [...row])
            newGrid[columnIndex][rowIndex] = turn
            setGrid(newGrid)
            setTurn(turn === 'x' ? 'o' : 'x')
        }
    }

    const createNewGame = () => {
        setGrid(initGame)
        setGameWinner(null)
    }

    useEffect(() => {
        const result = getGameEndResult(grid)
        if (result) {
            setGameWinner(result.player)
        }
    }, [grid])

    return (
        <SafeAreaView>
            <GameHeader gameWinner={gameWinner} turn={turn}></GameHeader>
            <GameGrid grid={grid} onCellClick={onCellClick}></GameGrid>
            <GameFooter
                gameWinner={gameWinner}
                createNewGame={createNewGame}></GameFooter>
        </SafeAreaView>
    )
}

export default GameScreen
