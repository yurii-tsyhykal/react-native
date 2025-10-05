import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ScreenNames} from '../constants/screenNames';
import {RootStackNavigation} from './types';
import LoggedInStack from './LoggedInStack';
import LoggedOutStack from './LoggedOutStack';
import {useEffect, useState} from 'react';
import {getAuth, onAuthStateChanged} from '@react-native-firebase/auth';
import {ActivityIndicator, View} from 'react-native';

const Stack = createNativeStackNavigator<RootStackNavigation>();

export default function RootNavigation() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), user => {
      setIsAuthenticated(!!user);
    });
    return subscriber;
  }, []);
  if (isAuthenticated === null) {
    return (
      <View>
        <ActivityIndicator size={'large'} color="#7A71BA" />
      </View>
    );
  }
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: '#FAFAFA',
        },
      }}
    >
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isAuthenticated ? (
          <Stack.Screen
            name={ScreenNames.LOGGED_IN_STACK}
            component={LoggedInStack}
          />
        ) : (
          <Stack.Screen
            name={ScreenNames.LOGGED_OUT_STACK}
            component={LoggedOutStack}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
