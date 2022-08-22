import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MoviesScreen from '../screens/MoviesScreen';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import {MovieType} from '../models/movie';

export type AppStackParamList = {
  MoviesScreen: undefined;
  MovieDetailScreen: {movie: MovieType};
};
const AppStack = createNativeStackNavigator<AppStackParamList>();

export default () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen name="MoviesScreen" component={MoviesScreen} />
        <AppStack.Screen
          name="MovieDetailScreen"
          component={MovieDetailScreen}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};
