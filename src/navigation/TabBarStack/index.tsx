import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ScreenNames} from '../../constants/screenNames';
import HomePage from '../../screen/Home';
import {TabBarStackType} from '../types';
import Favorite from '../../screen/Favorite';
import TabBarOptions from './options';

const TabStack = createBottomTabNavigator<TabBarStackType>();
export default function TabBarStack() {
  return (
    <TabStack.Navigator
      initialRouteName={ScreenNames.HOME_PAGE}
      screenOptions={({route}) => TabBarOptions(route)}
    >
      <TabStack.Screen name={ScreenNames.HOME_PAGE} component={HomePage} />
      <TabStack.Screen name={ScreenNames.FAVORITE_PAGE} component={Favorite} />
    </TabStack.Navigator>
  );
}
