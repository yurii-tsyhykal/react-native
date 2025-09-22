import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ScreenNames} from '../../constants/screenNames';
import {LoggedInStackType} from '../types';
import {SafeAreaView} from 'react-native-safe-area-context';
import DrawerStack from '../DrawerStack';
import Filter from '../../screen/Filter';
import FilterHeader from '../../common/components/FilterHeader';
import PetPage from '../../screen/Pet';
import LanguagesPage from '../../screen/Languages';

const Stack = createNativeStackNavigator<LoggedInStackType>();

export default function LoggedInStack() {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView style={{flex: 1}}>
      <Stack.Navigator
        initialRouteName={ScreenNames.DRAWER_STACK}
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name={ScreenNames.DRAWER_STACK} component={DrawerStack} />
        <Stack.Screen
          options={{
            headerShown: true,
            header: () => <FilterHeader />,
          }}
          name={ScreenNames.FILTER_PAGE}
          component={Filter}
        />
        <Stack.Screen name={ScreenNames.PET_PAGE} component={PetPage} />
        <Stack.Screen
          name={ScreenNames.LANGUAGES_PAGE}
          component={LanguagesPage}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
}
