import React from 'react'
import {SafeAreaView} from 'react-native'
import Grid from './Grid.tsx'

function GameScreen(): React.JSX.Element {
    // const navigation = useNavigation<any>()

    // const navigateToTestingScreen = () => {
    //     navigation.navigate('TestingScreen')
    // }

    /**
     * Grid
     *  - Buttons
     *    - Empty, X, O
     * Winning condition
     *
     */

    return (
        <SafeAreaView>
            {/*<Button*/}
            {/*    title="Go to Another Screen"*/}
            {/*    onPress={navigateToTestingScreen}*/}
            {/*/>*/}
            <Grid />
        </SafeAreaView>
    )
}

export default GameScreen
