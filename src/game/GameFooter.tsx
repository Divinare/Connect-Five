import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'

interface Props {
    gameWinner: string | null
    createNewGame: () => void
}

const GameFooter = ({gameWinner, createNewGame}: Props) => {
    return (
        <>
            {gameWinner && (
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
        alignItems: 'center',
        gap: 10,
        padding: 5,
        width: '100%',
    },
    newGameButtonText: {
        color: 'black',
        fontSize: 20,
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
    },
})

export default GameFooter
