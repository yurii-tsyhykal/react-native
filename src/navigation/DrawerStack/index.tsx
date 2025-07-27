import {createDrawerNavigator} from '@react-navigation/drawer';
import {ScreenNames} from '../../constants/screenNames';
import TabBarStack from '../TabBarStack';
import {DrawerStackType} from '../types';

const Drawer = createDrawerNavigator<DrawerStackType>();

export default function DrawerStack() {
  return (
    <Drawer.Navigator initialRouteName={ScreenNames.TAB_BAR_STACK}>
      <Drawer.Screen name={ScreenNames.TAB_BAR_STACK} component={TabBarStack} />
    </Drawer.Navigator>
  );
}
