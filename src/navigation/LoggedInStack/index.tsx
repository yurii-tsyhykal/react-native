import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ScreenNames} from '../../constants/screenNames';
import HomePage from '../../screen/Home';
import {LoggedInStackType} from '../types';

const Stack = createNativeStackNavigator<LoggedInStackType>();

export default function LoggedInStack() {
  return (
    <Stack.Navigator initialRouteName={ScreenNames.HOME_PAGE}>
      <Stack.Screen name={ScreenNames.HOME_PAGE} component={HomePage} />
    </Stack.Navigator>
  );
}
