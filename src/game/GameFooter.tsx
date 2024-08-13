import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'

import {GameEndResult} from './types/GameEndResult.ts'
import UndoSvg from '../icons/undo.tsx'
import {colors} from '../colors.ts'

interface Props {
    gameEndResult: GameEndResult | null
    createNewGame: () => void
    undoMove: () => void
}

const GameFooter = ({gameEndResult, createNewGame, undoMove}: Props) => {
    return (
        <>
            {gameEndResult && (
                <View style={styles.newGameButtonContainer}>
                    <TouchableOpacity onPress={createNewGame}>
                        <Text style={styles.newGameButtonText}>
                            Aloita uusi peli
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
            {!gameEndResult && (
                <View style={styles.undoButtonContainer}>
                    <TouchableOpacity
                        style={styles.undoButton}
                        onPress={undoMove}>
                        <UndoSvg />
                    </TouchableOpacity>
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    newGameButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 20,
        width: '100%',
        backgroundColor: colors.appBackground,
    },
    newGameButtonText: {
        color: '#1abc9c',
        fontSize: 20,
        borderWidth: 2,
        borderColor: '#16a085',
        textAlign: 'center',
        alignContent: 'center',
        textAlignVertical: 'center',
        padding: 10,
    },
    undoButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 10,
        width: '100%',
    },
    undoButton: {
        display: 'flex',
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    buttonText: {
        color: 'white',
    },
})

export default GameFooter
