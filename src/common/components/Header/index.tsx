import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {CloseIcon, LabelIcon} from '../../../assets/icons';
import {DrawerActions, useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  headerWrapper: {
    width: '100%',
    height: 60,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerButton: {height: 30, gap: 4, width: 25, paddingVertical: 10},
  burgerLine: {
    width: '100%',
    height: 2,
    backgroundColor: 'black',
    borderRadius: 50,
  },
});

interface IHeader {
  isOpenDrawer?: boolean;
  navigation?: any;
}

export default function Header({
  isOpenDrawer = false,
  navigation: navProp,
}: IHeader) {
  const navigationHook = useNavigation();
  const navigation = navProp || navigationHook;
  const handleOpenDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };
  return (
    <View style={styles.headerWrapper}>
      <LabelIcon />
      {isOpenDrawer ? (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleOpenDrawer}
        >
          <CloseIcon />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleOpenDrawer}
        >
          <View style={styles.burgerLine} />
          <View style={styles.burgerLine} />
          <View style={styles.burgerLine} />
        </TouchableOpacity>
      )}
    </View>
  );
}
