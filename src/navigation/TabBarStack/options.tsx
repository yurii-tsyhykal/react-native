import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {View} from 'react-native';
import {HeartIcon, PawIcon} from '../../assets/icons';
import {ScreenNames} from '../../constants/screenNames';
import {Text} from 'react-native-gesture-handler';
import {i18n} from '../../i18n';

const getName = (name: string) => {
  switch (name) {
    case ScreenNames.HOME_PAGE:
      return i18n.t('navigation.tabBar.pets');
    case ScreenNames.FAVORITE_PAGE:
      return i18n.t('navigation.tabBar.favorites');
  }
};

const getIcon = (name: string, focused: boolean) => {
  switch (name) {
    case ScreenNames.HOME_PAGE:
      return <PawIcon color={'#0B0B0B'} isFocused={focused} />;
    case ScreenNames.FAVORITE_PAGE:
      return <HeartIcon color={'#0B0B0B'} isFocused={focused} />;
  }
};

export default function TabBarOptions(route: {
  name: string;
}): BottomTabNavigationOptions {
  return {
    headerShown: false,
    tabBarShowLabel: true,
    tabBarLabelStyle: {
      fontSize: 12,
      marginTop: 4,
    },
    tabBarItemStyle: {
      justifyContent: 'center',
    },
    tabBarStyle: {
      backgroundColor: '#E5F3E5',
      borderTopRightRadius: 50,
      borderTopLeftRadius: 50,
      borderBottomRightRadius: 0,
      paddingBottom: 0,
      paddingTop: 5,
      paddingHorizontal: 10,
    },
    tabBarIcon: ({focused}) => {
      return (
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={{marginBottom: 10}}>{getIcon(route.name, focused)}</View>
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
  };
}
