import {StyleSheet, Text, View} from 'react-native'
import {player} from './GameScreen.tsx'
import React from 'react'

interface Props {
    gameWinner: string | null
    turn: player
}
const GameHeader = ({gameWinner, turn}: Props) => {
    return (
        <View style={styles.headerContainer}>
            {gameWinner ? (
                <>
                    <Text style={styles.headerText}>Peli päättyi,</Text>
                    <Text
                        style={[
                            styles.headerText,
                            {color: turn === 'o' ? 'red' : 'blue'},
                        ]}>
                        {gameWinner}
                    </Text>
                    <Text style={styles.headerText}>voitti!</Text>
                </>
            ) : (
                <>
                    <Text style={styles.headerText}>Pelaajan</Text>
                    <Text
                        style={[
                            styles.headerText,
                            {color: turn === 'o' ? 'blue' : 'red'},
                        ]}>
                        {turn}
                    </Text>
                    <Text style={styles.headerText}>vuoro.</Text>
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
    headerText: {
        fontSize: 30,
        color: 'black',
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
})

export default GameHeader
