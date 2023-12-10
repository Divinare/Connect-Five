import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, SafeAreaView, Text} from 'react-native';

function GameScreen(): React.JSX.Element {
    const navigation = useNavigation();

    const handleButtonPress = () => {
        // Navigate to the screen with the name "AnotherScreen"
        navigation.navigate('TestingScreen');
    };

    return (
        <SafeAreaView>
            <Button title="Go to Another Screen" onPress={handleButtonPress} />
            <Text>Some text</Text>
        </SafeAreaView>
    );
}

export default GameScreen;
