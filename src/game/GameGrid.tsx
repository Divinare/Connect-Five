import React from 'react'
import {StyleSheet, View} from 'react-native'
import GameCell from './GameCell.tsx'

interface Props {
    grid: string[][]
    onCellClick: (columnIndex: number, rowIndex: number) => void
}

const GameGrid = ({grid, onCellClick}: Props) => {
    return (
        <View style={styles.grid}>
            {grid.map((columns: string[], columnIndex: number) => (
                <View style={styles.gridRow} key={`column-${columnIndex}`}>
                    {columns.map((content: string, rowIndex: number) => (
                        <GameCell
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
})

export default GameGrid
