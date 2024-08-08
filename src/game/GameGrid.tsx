import React from 'react'

import {GameEndResult} from './types/GameEndResult.ts'
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from 'react-native-gesture-handler'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated'
import {
    CELL_HEIGHT,
    CELL_WIDTH,
    COLUMNS,
    GAME_HEIGHT,
    GAME_WIDTH,
    ROWS,
} from './constants.ts'
import {Pressable, StyleSheet, Text} from 'react-native'

interface Props {
    grid: string[][]
    onCellClick: (columnIndex: number, rowIndex: number) => void
    gameEndResult: GameEndResult | null
}

const GameGrid: React.FC<Props> = ({grid, onCellClick}: Props) => {
    const scale = useSharedValue(1)
    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)
    const lastTranslateX = useSharedValue(0)
    const lastTranslateY = useSharedValue(0)
    const lastScale = useSharedValue(1)

    const panGesture = Gesture.Pan()
        .onUpdate(event => {
            translateX.value = lastTranslateX.value + event.translationX
            translateY.value = lastTranslateY.value + event.translationY
        })
        .onEnd(() => {
            lastTranslateX.value = translateX.value
            lastTranslateY.value = translateY.value
        })

    const pinchGesture = Gesture.Pinch()
        .onUpdate(event => {
            scale.value = lastScale.value * event.scale
        })
        .onEnd(() => {
            lastScale.value = scale.value
        })

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: translateX.value},
                {translateY: translateY.value},
                {scale: scale.value},
            ],
        }
    })

    const renderCells = () => {
        const cells = []
        for (let row = 0; row < ROWS; row++) {
            for (let column = 0; column < COLUMNS; column++) {
                cells.push(
                    <Animated.View key={`${row}-${column}`}>
                        <Pressable
                            style={[styles.button]}
                            onPress={() => onCellClick(row, column)}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    verticalAlign: 'center',
                                    lineHeight: 24,
                                    color:
                                        grid[column][row] === 'o'
                                            ? 'blue'
                                            : grid[column][row] === 'x'
                                            ? 'red'
                                            : 'black',
                                }}>
                                {grid[column][row]}
                            </Text>
                        </Pressable>
                    </Animated.View>,
                )
            }
        }
        return cells
    }

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <GestureDetector
                gesture={Gesture.Simultaneous(panGesture, pinchGesture)}>
                <Animated.View style={[styles.gridContainer, animatedStyle]}>
                    {renderCells()}
                </Animated.View>
            </GestureDetector>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 2,
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
    },
    button: {
        width: CELL_WIDTH,
        height: CELL_HEIGHT,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderRadius: 0,
        margin: 0,
        padding: 0,
        color: 'blue',
        textAlign: 'center',
    },
})

export default GameGrid
