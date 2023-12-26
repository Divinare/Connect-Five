import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import React, {useEffect, useState} from 'react'
import {getGameEndResult} from './getGameEndResult.ts'

const ROWS = 20
const COLUMNS = 12
const SCREEN_WIDTH = Dimensions.get('window').width
const GAME_PADDING = 5
const GAME_WIDTH = Math.floor(SCREEN_WIDTH - GAME_PADDING * 2 - 2)
const CELL_WIDTH = Math.floor(GAME_WIDTH / COLUMNS)
const EMPTY_CELL = ''

type player = 'x' | 'o'

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

const Cell = ({
    content,
    onCellClick,
}: {
    content: string
    onCellClick: () => void
}) => {
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={onCellClick}>
            <Text
                style={[
                    styles.buttonContent,
                    {
                        width: CELL_WIDTH,
                        height: CELL_WIDTH,
                        color: content === 'o' ? 'blue' : 'red',
                    },
                ]}>
                {content}
            </Text>
        </TouchableOpacity>
    )
}

const Grid = (): React.JSX.Element => {
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
        <>
            <View style={styles.grid}>
                {grid.map((columns: string[], columnIndex: number) => (
                    <View style={styles.gridRow} key={`column-${columnIndex}`}>
                        {columns.map((content: string, rowIndex: number) => (
                            <Cell
                                key={`row-${rowIndex}`}
                                content={content}
                                onCellClick={() =>
                                    onCellClick(columnIndex, rowIndex)
                                }
                            />
                        ))}
                    </View>
                ))}
            </View>
            {gameWinner && (
                <View style={styles.newGameButtonContainer}>
                    <Text style={styles.gameEndedText}>
                        Peli päättyi, {gameWinner} voitti.
                    </Text>
                    <TouchableOpacity onPress={createNewGame}>
                        <Text style={styles.newGameButtonText}>
                            Aloita uusi peli.
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    grid: {
        margin: 5,
        display: 'flex',
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: 'black',
    },
    gridRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    buttonContainer: {
        margin: 0,
        padding: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 0,
    },
    buttonContent: {
        display: 'flex',
        color: 'blue',
        fontSize: 20,
        textAlign: 'center',
    },
    newGameButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 5,
        width: '100%',
    },
    gameEndedText: {
        color: 'black',
        fontSize: 20,
    },
    newGameButtonText: {
        color: 'black',
        fontSize: 20,
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
    },
})

export default Grid
