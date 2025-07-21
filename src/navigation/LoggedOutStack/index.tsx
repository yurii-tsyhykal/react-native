import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ScreenNames} from '../../constants/screenNames';
import LoginPage from '../../screen/Auth/Login';
import Registration from '../../screen/Auth/Registration';
import {LoggedOutStackType} from '../types';

const Stack = createNativeStackNavigator<LoggedOutStackType>();

export default function LoggedOutStack() {
  return (
    <Stack.Navigator initialRouteName={ScreenNames.LOGIN_PAGE}>
      <Stack.Screen name={ScreenNames.LOGIN_PAGE} component={LoginPage} />
      <Stack.Screen
        name={ScreenNames.REGISTRATION_PAGE}
        component={Registration}
      />
    </Stack.Navigator>
  );
}
