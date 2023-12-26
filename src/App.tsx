import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GameScreen from './game/GameScreen.tsx';
import TestingScreen from './TestingScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="GameScreen"
                    component={GameScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="TestingScreen"
                    component={TestingScreen}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
