import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ScreenNames} from '../../constants/screenNames';
import {LoggedInStackType} from '../types';
import {SafeAreaView} from 'react-native-safe-area-context';
import TabBarStack from '../TabBarStack';

const Stack = createNativeStackNavigator<LoggedInStackType>();

export default function LoggedInStack() {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView style={{flex: 1}}>
      <Stack.Navigator
        initialRouteName={ScreenNames.TAB_BAR_STACK}
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name={ScreenNames.TAB_BAR_STACK}
          component={TabBarStack}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
}
