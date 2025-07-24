import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ScreenNames} from '../../constants/screenNames';
import HomePage from '../../screen/Home';
import {TabBarStackType} from '../types';
import Favorite from '../../screen/Favorite';
import {Text, View} from 'react-native';
import {HeartIcon, LabelIcon, PawIcon} from '../../assets/icons';

const getName = (name: string) => {
  switch (name) {
    case ScreenNames.HOME_PAGE:
      return 'Пухнастики';
    case ScreenNames.FAVORITE_PAGE:
      return 'Улюблені';
  }
};

const TabStack = createBottomTabNavigator<TabBarStackType>();
export default function TabBarStack() {
  return (
    <TabStack.Navigator
      initialRouteName={ScreenNames.HOME_PAGE}
      screenOptions={({route}) => ({
        header: () => {
          return (
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                width: '100%',
                height: 60,
                alignItems: 'center',
                padding: 10,
              }}
            >
              <LabelIcon />
            </View>
          );
        },
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 4,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
        },
        tabBarStyle: {
          // height: 82,
          backgroundColor: '#E5F3E5',
          borderTopRightRadius: 50,
          borderTopLeftRadius: 50,
          borderBottomRightRadius: 0,
          borderBottomRightLeft: 0,
          paddingBottom: 0,
          paddingTop: 5,
          paddingHorizontal: 10,
        },
        tabBarIcon: ({focused}) => {
          const isHomePage = route.name === ScreenNames.HOME_PAGE;
          return (
            // eslint-disable-next-line react-native/no-inline-styles
            <View style={{marginBottom: 10}}>
              {isHomePage ? (
                <PawIcon color={'#0B0B0B'} isFocused={focused} />
              ) : (
                <HeartIcon color={'#0B0B0B'} isFocused={focused} />
              )}
            </View>
          );
        },
        tabBarLabel: ({focused}) => {
          return (
            // eslint-disable-next-line react-native/no-inline-styles
            <Text style={{flex: 1, color: focused ? '#0B0B0B' : '#838383'}}>
              {getName(route.name)}
            </Text>
          );
        },
      })}
    >
      <TabStack.Screen name={ScreenNames.HOME_PAGE} component={HomePage} />
      <TabStack.Screen name={ScreenNames.FAVORITE_PAGE} component={Favorite} />
    </TabStack.Navigator>
  );
}
