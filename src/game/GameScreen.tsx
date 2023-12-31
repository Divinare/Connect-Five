import {SafeAreaView} from 'react-native'
import React, {useState} from 'react'
import {useGameResult} from './getGameEndResult.ts'
import {COLUMNS, EMPTY_CELL, ROWS} from './constants.ts'
import GameHeader from './GameHeader.tsx'
import GameFooter from './GameFooter.tsx'
import GameGrid from './GameGrid.tsx'
import {GameState} from './types/GameState.ts'
import {Move} from './types/Move.ts'

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
    const [moveHistory, setMoveHistory] = useState<Move[]>([])
    const initialGameState: GameState = {
        grid: initGame(),
        currentTurn: 'x',
        lastMove: null,
    }
    const [gameState, setGameState] = useState<GameState>(initialGameState)
    const gameEndResult = useGameResult(gameState)
    const onCellClick = (columnIndex: number, rowIndex: number) => {
        if (
            !gameEndResult &&
            gameState.grid[rowIndex][columnIndex] === EMPTY_CELL
        ) {
            const newGrid = gameState.grid.map(row => [...row])
            newGrid[rowIndex][columnIndex] = gameState.currentTurn

            const currentTurn: Player =
                gameState.currentTurn === 'x' ? 'o' : 'x'
            const currentMove: Move = {
                player: gameState.currentTurn,
                coordinates: {
                    x: columnIndex,
                    y: rowIndex,
                },
            }
            setGameState({
                grid: newGrid,
                currentTurn,
                lastMove: currentMove,
            })
            setMoveHistory(prevMoveHistory => [...prevMoveHistory, currentMove])
        }
    }

    const createNewGame = () => {
        setGameState(initialGameState)
    }

    const undoMove = () => {
        if (moveHistory.length > 0) {
            const previousMove = moveHistory[moveHistory.length - 1]

            const newGrid = gameState.grid
            newGrid[previousMove.coordinates.y][previousMove.coordinates.x] = ''
            // Update the state with the previous state
            setGameState({
                grid: newGrid,
                lastMove: previousMove,
                currentTurn: previousMove.player,
            })

            setMoveHistory(prevMoveHistory => prevMoveHistory.slice(0, -1))
        }
    }

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
                createNewGame={createNewGame}
                undoMove={undoMove}></GameFooter>
        </SafeAreaView>
    )
}

export default GameScreen
