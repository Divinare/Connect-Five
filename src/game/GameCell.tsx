import React from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'
import {CELL_WIDTH} from './constants.ts'

interface Props {
    content: string
    onCellClick: () => void
}

const GameCell = ({content, onCellClick}: Props) => {
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

const styles = StyleSheet.create({
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

export default GameCell
