import React, {useEffect, useRef} from 'react'
import {
    DimensionValue,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    ViewStyle,
} from 'react-native'
import Canvas from 'react-native-canvas'
import {
    CELL_WIDTH,
    COLUMNS,
    GAME_HEIGHT,
    GAME_PADDING,
    GAME_WIDTH,
    ROWS,
} from './constants.ts'

import {GameEndResult} from './types/GameEndResult.ts'

interface Props {
    grid: string[][]
    onCellClick: (columnIndex: number, rowIndex: number) => void
    gameEndResult: GameEndResult | null
}

const GameGrid: React.FC<Props> = ({
    grid,
    onCellClick,
    gameEndResult,
}: Props) => {
    const canvasRef = useRef<Canvas>(null)

    useEffect(() => {
        const canvas = canvasRef.current!
        canvas.width = GAME_WIDTH
        canvas.height = GAME_HEIGHT
        const context = canvas.getContext('2d')!
        const width = GAME_WIDTH
        const height = GAME_HEIGHT

        const drawGrid = () => {
            const cellWidth = width / COLUMNS
            const cellHeight = height / ROWS

            for (let i = 0; i <= ROWS; i++) {
                const y = i * cellHeight
                context.moveTo(0, y)
                context.lineTo(width, y)
            }

            for (let i = 0; i <= COLUMNS; i++) {
                const x = i * cellWidth
                context.moveTo(x, 0)
                context.lineTo(x, height)
            }

            context.strokeStyle = 'black'
            context.stroke()
        }

        drawGrid()

        if (gameEndResult) {
            const startRow = gameEndResult.start.y
            const startColumn = gameEndResult.start.x
            const endRow = gameEndResult.end.y
            const endColumn = gameEndResult.end.x

            const HALF_CELL_WIDTH = Math.floor(CELL_WIDTH / 2)

            const startX =
                startColumn * CELL_WIDTH + startColumn + HALF_CELL_WIDTH
            const startY =
                startRow * CELL_WIDTH - startRow / 2 + HALF_CELL_WIDTH

            const endX = endColumn * CELL_WIDTH + endColumn + HALF_CELL_WIDTH
            const endY = endRow * CELL_WIDTH - endRow / 2 + HALF_CELL_WIDTH

            context.beginPath()
            context.moveTo(startX, startY)
            context.lineTo(endX, endY)
            context.strokeStyle = gameEndResult.winner === 'x' ? 'red' : 'blue'
            context.lineWidth = 2
            context.stroke()
        }
    }, [gameEndResult])

    const handleCellClick = (row: number, column: number) => {
        onCellClick(column, row)
    }

    const renderTouchableCells = (): React.ReactNode[] => {
        const touchableCells: React.ReactNode[] = []
        for (let row = 0; row < ROWS; row++) {
            for (let column = 0; column < COLUMNS; column++) {
                const cellContent = grid[row][column]
                touchableCells.push(
                    <TouchableHighlight
                        key={`${row}-${column}`}
                        style={getCellStyle(row, column, ROWS, COLUMNS)}
                        onPress={() => handleCellClick(row, column)}
                        underlayColor="transparent">
                        <Text
                            style={[
                                styles.cell,
                                {
                                    color: cellContent === 'o' ? 'blue' : 'red',
                                },
                            ]}>
                            {cellContent}
                        </Text>
                    </TouchableHighlight>,
                )
            }
        }
        return touchableCells
    }

    const getCellStyle = (
        row: number,
        column: number,
        rows: number,
        columns: number,
    ): ViewStyle => {
        const cellWidthPercentage = 100 / columns
        const cellHeightPercentage = 100 / rows

        return {
            position: 'absolute',
            top: (row * cellHeightPercentage + '%') as DimensionValue,
            left: (column * cellWidthPercentage + '%') as DimensionValue,
            width: (cellWidthPercentage + '%') as DimensionValue,
            height: (cellHeightPercentage + '%') as DimensionValue,
        }
    }

    return (
        <View style={styles.gridContainer}>
            <Canvas
                ref={canvasRef}
                style={{
                    width: GAME_WIDTH,
                    height: GAME_HEIGHT,
                    backgroundColor: 'white',
                }}
            />
            {renderTouchableCells()}
        </View>
    )
}

const styles = StyleSheet.create({
    gridContainer: {
        display: 'flex',
        margin: GAME_PADDING,
    },
    cell: {
        display: 'flex',
        color: 'blue',
        fontSize: 20,
        textAlign: 'center',
    },
})

export default GameGrid
