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
import {CELL_HEIGHT, CELL_WIDTH} from './constants.ts'
import {Pressable, StyleSheet, Text, View} from 'react-native'
import {Coordinate} from './types/Coordinate.ts'

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
        return grid.map((rows, rowIndex: number) => {
            return (
                <View style={[styles.buttonRow]} key={rowIndex}>
                    {rows.map((cell: string, colIndex: number) => {
                        const isWinningCell =
                            gameEndResult?.winningStreak?.find(
                                (coordinate: Coordinate) =>
                                    coordinate.y === rowIndex &&
                                    coordinate.x === colIndex,
                            )
                        const backgroundColor = isWinningCell
                            ? gameEndResult?.winner === 'o'
                                ? 'blue'
                                : 'red'
                            : 'white'
                        const fontColor = isWinningCell
                            ? 'white'
                            : cell === 'o'
                            ? 'blue'
                            : 'red'
                        return (
                            <Pressable
                                key={colIndex}
                                style={[styles.button, {backgroundColor}]}
                                onPress={() => onCellClick(colIndex, rowIndex)}>
                                <Text
                                    style={{
                                        fontSize: 24,
                                        alignContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        lineHeight: 24,
                                        color: fontColor,
                                    }}>
                                    {cell}
                                </Text>
                            </Pressable>
                        )
                    })}
                </View>
            )
        })
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
    gridContainer: {},
    buttonRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    button: {
        width: CELL_WIDTH,
        height: CELL_HEIGHT,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 0,
        margin: 0,
        padding: 0,
        color: 'blue',
        textAlign: 'center',
    },
})

export default GameGrid
