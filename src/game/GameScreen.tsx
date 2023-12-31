import {SafeAreaView} from 'react-native'
import React, {useEffect, useState} from 'react'
import {getGameEndResult} from './getGameEndResult.ts'
import {COLUMNS, EMPTY_CELL, ROWS} from './constants.ts'
import GameHeader from './GameHeader.tsx'
import GameFooter from './GameFooter.tsx'
import GameGrid from './GameGrid.tsx'
import {GameEndResult} from './types/GameEndResult.ts'
import {GameState} from './types/GameState.ts'

export type Player = 'x' | 'o'

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
    // const [grid, setGrid] = useState<string[][]>(initGame())
    // const [lastMove, setLastMove] = useState<Move | null>(null)
    // const [turn, setTurn] = useState<Player>('x')
    const [gameEndResult, setGameEndResult] = useState<GameEndResult | null>(
        null,
    )

    const initialGameState: GameState = {
        grid: initGame(),
        currentTurn: 'x',
        lastMove: null,
    }
    const [gameState, setGameState] = useState<GameState>(initialGameState)

    const onCellClick = (columnIndex: number, rowIndex: number) => {
        if (
            !gameEndResult &&
            gameState.grid[rowIndex][columnIndex] === EMPTY_CELL
        ) {
            const newGrid = gameState.grid.map(row => [...row])
            newGrid[rowIndex][columnIndex] = gameState.currentTurn

            const currentTurn = gameState.currentTurn === 'x' ? 'o' : 'x'
            setGameState({
                grid: newGrid,
                currentTurn,
                lastMove: {
                    player: gameState.currentTurn,
                    coordinates: {
                        x: columnIndex,
                        y: rowIndex,
                    },
                },
            })
        }
    }

    const createNewGame = () => {
        setGameState(initialGameState)
        setGameEndResult(null)
    }

    useEffect(() => {
        // TODO: refactor this as a hook: useGameResult
        const result = getGameEndResult(gameState)
        if (result) {
            setGameEndResult(result)
        }
    }, [gameState])

    return (
        <SafeAreaView>
            <GameHeader
                gameEndResult={gameEndResult}
                turn={gameState.currentTurn}></GameHeader>
            <GameGrid
                grid={gameState.grid}
                onCellClick={onCellClick}
                gameEndResult={gameEndResult}></GameGrid>
            <GameFooter
                gameEndResult={gameEndResult}
                createNewGame={createNewGame}></GameFooter>
        </SafeAreaView>
    )
}

export default GameScreen
