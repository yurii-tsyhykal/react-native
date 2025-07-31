import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Header from '../Header';
import {fonts} from '../../../constants/fonts';
import {ArrowRightIcon} from '../../../assets/icons';

export default function DrawerContent({props}: any) {
  return (
    <View>
      <Header isOpenDrawer={true} navigation={props.navigation} />
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Наш сайт</Text>
          <ArrowRightIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Налаштування мови</Text>
          <ArrowRightIcon />
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
