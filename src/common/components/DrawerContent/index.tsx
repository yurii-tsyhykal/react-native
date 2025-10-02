import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Header from '../Header';
import {fonts} from '../../../constants/fonts';
import {ArrowIcon} from '../../../assets/icons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {LoggedInStackType} from '../../../navigation/types';
import {ScreenNames} from '../../../constants/screenNames';
import {useTranslation} from 'react-i18next';

export default function DrawerContent({props}: any) {
  const {navigation} = props;
  const navigationStack =
    useNavigation<StackNavigationProp<LoggedInStackType>>();
  const {t} = useTranslation();

  const handleToLngPage = () => {
    navigation.closeDrawer();
    navigationStack.navigate(ScreenNames.LANGUAGES_PAGE);
  };

  const handleToWebPage = () => {
    navigation.closeDrawer();
    navigationStack.navigate(ScreenNames.WEB_PAGE);
  };
  return (
    <View>
      <Header isOpenDrawer={true} navigation={props.navigation} />
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={handleToWebPage} style={styles.btn}>
          <Text style={styles.btnText}>{t('drawer.website')}</Text>
          <ArrowIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleToLngPage} style={styles.btn}>
          <Text style={styles.btnText}>{t('drawer.language')}</Text>
          <ArrowIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>{t('drawer.logOut')}</Text>
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
