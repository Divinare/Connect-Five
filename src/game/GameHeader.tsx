import {StyleSheet, Text, View} from 'react-native'
import {Player} from './GameScreen.tsx'
import React from 'react'
import {GameEndResult} from './types/GameEndResult.ts'
import {colors} from '../colors.ts'

interface Props {
    gameEndResult: GameEndResult | null
    turn: Player
}
const GameHeader = ({gameEndResult, turn}: Props) => {
    return (
        <>
            <View style={styles.headerContainer}>
                {gameEndResult ? (
                    <>
                        <Text style={styles.headerText}>Peli päättyi,</Text>
                        <Text
                            style={[
                                styles.headerText,
                                {
                                    color:
                                        turn === 'o'
                                            ? colors.playerX
                                            : colors.playerO,
                                },
                            ]}>
                            {gameEndResult.winner}
                        </Text>
                        <Text style={styles.headerText}>voitti!</Text>
                    </>
                ) : (
                    <>
                        <Text style={styles.headerText}>Pelaajan</Text>
                        <Text
                            style={[
                                styles.headerText,
                                {
                                    color:
                                        turn === 'o'
                                            ? colors.playerO
                                            : colors.playerX,
                                },
                            ]}>
                            {turn}
                        </Text>
                        <Text style={styles.headerText}>vuoro.</Text>
                    </>
                )}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        position: 'absolute',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        gap: 10,
        padding: 10,
        backgroundColor: colors.appBackground,
    },
    headerText: {
        fontSize: 30,
        color: colors.text,
    },
})

export default GameHeader
