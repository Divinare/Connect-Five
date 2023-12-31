import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'

import {GameEndResult} from './types/GameEndResult.ts'

interface Props {
    gameEndResult: GameEndResult | null
    createNewGame: () => void
}

const GameFooter = ({gameEndResult, createNewGame}: Props) => {
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
        </>
    )
}

const styles = StyleSheet.create({
    newGameButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        width: '100%',
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
})

export default GameFooter
