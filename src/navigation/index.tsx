import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen';
import MoviesScreen from '../screens/MoviesScreen';

const AppStack = createNativeStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen name="MainScreen" component={MainScreen} />
        <AppStack.Screen name="MoviesScreen" component={MoviesScreen} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};
