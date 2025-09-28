import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ArrowIcon} from '../../../assets/icons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {LoggedInStackType} from '../../../navigation/types';
import {fonts} from '../../../constants/fonts';
import {useTranslation} from 'react-i18next';

type FilterHeaderProps = {
  title: string;
};

export default function FilterHeader({title}: FilterHeaderProps) {
  const navigation = useNavigation<StackNavigationProp<LoggedInStackType>>();
  const {t} = useTranslation();
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.goBackBtn}
        onPress={() => navigation.goBack()}
      >
        <ArrowIcon width={20} height={20} />
      </TouchableOpacity>
      <Text style={[styles.title, title !== 'Фільтри' && styles.titleLng]}>
        {t(title)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
  },
  goBackBtn: {
    transform: [{rotate: '180deg'}],
  },
  title: {
    flex: 0.61,
    fontFamily: fonts.MontserratSemiBold,
    color: 'black',
  },
  titleLng: {flex: 0.73},
});
