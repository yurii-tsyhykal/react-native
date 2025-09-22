import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Header from '../Header';
import {fonts} from '../../../constants/fonts';
import {ArrowIcon} from '../../../assets/icons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {LoggedInStackType} from '../../../navigation/types';
import {ScreenNames} from '../../../constants/screenNames';

export default function DrawerContent({props}: any) {
  const navigation = useNavigation<StackNavigationProp<LoggedInStackType>>();

  const handleToLngPage = () => {
    navigation.navigate(ScreenNames.LANGUAGES_PAGE);
  };
  return (
    <View>
      <Header isOpenDrawer={true} navigation={props.navigation} />
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Наш сайт</Text>
          <ArrowIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleToLngPage} style={styles.btn}>
          <Text style={styles.btnText}>Налаштування мови</Text>
          <ArrowIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Вихід</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {marginHorizontal: 10, gap: 16},
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnText: {
    fontFamily: fonts.ComfortaaRegular,
    fontSize: 16,
    color: 'black',
  },
});
