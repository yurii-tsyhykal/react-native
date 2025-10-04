import {createDrawerNavigator} from '@react-navigation/drawer';
import {ScreenNames} from '../../constants/screenNames';
import TabBarStack from '../TabBarStack';
import {DrawerStackType} from '../types';
import Header from '../../common/components/Header';
import {Dimensions} from 'react-native';
import DrawerContent from '../../common/components/DrawerContent';

const Drawer = createDrawerNavigator<DrawerStackType>();

export default function DrawerStack() {
  const header = () => <Header />;
  const drawerContent = (props: any) => <DrawerContent props={props} />;
  return (
    <Drawer.Navigator
      initialRouteName={ScreenNames.TAB_BAR_STACK}
      drawerContent={props => drawerContent(props)}
      screenOptions={{
        header: header,
        drawerPosition: 'right',
        drawerStyle: {
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          width: Dimensions.get('window').width,
        },
      }}
    >
      <Drawer.Screen name={ScreenNames.TAB_BAR_STACK} component={TabBarStack} />
    </Drawer.Navigator>
  );
}
