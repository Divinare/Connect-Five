import React from 'react';
import type {PropsWithChildren} from 'react';
import {
    Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View
} from 'react-native';


function GameScreen(): React.JSX.Element {
    console.log("rendering game")
    return (
        <SafeAreaView>
            <Button title="test" onPress={() => navigation.navigate('Profile', {name: 'Jane'})}></Button>
            <Text>Testi</Text>
        </SafeAreaView>
    )
}

export default GameScreen