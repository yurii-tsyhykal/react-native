import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ScreenNames} from '../../constants/screenNames';
import HomePage from '../../screen/Home';
import {TabBarStackType} from '../types';
import Favorite from '../../screen/Favorite';
import {View} from 'react-native';
import {HeartIcon, PawIcon} from '../../assets/icons';

const TabStack = createBottomTabNavigator<TabBarStackType>();
export default function TabBarStack() {
  return (
    <TabStack.Navigator
      initialRouteName={ScreenNames.HOME_PAGE}
      screenOptions={({route}) => ({
        tabBarStyle: {
          height: 60,
          width: '100%',
          backgroundColor: '#E5F3E5',
          borderTopRightRadius: 50,
          borderTopLeftRadius: 50,
          padding: 10,
        },
        tabBarIcon: ({focused}) => {
            const isHomePage = route.name === ScreenNames.HOME_PAGE;
            const
          return <View>{isHomePage ? <PawIcon /> : <HeartIcon />}</View>;
        },
      })}>
      <TabStack.Screen name={ScreenNames.HOME_PAGE} component={HomePage} />
      <TabStack.Screen name={ScreenNames.FAVORITE_PAGE} component={Favorite} />
    </TabStack.Navigator>
  );
}
