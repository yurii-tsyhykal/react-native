import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ArrowIcon} from '../../../assets/icons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {LoggedInStackType} from '../../../navigation/types';
import {fonts} from '../../../constants/fonts';

export default function FilterHeader() {
  const navigation = useNavigation<StackNavigationProp<LoggedInStackType>>();
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.goBackBtn}
        onPress={() => navigation.goBack()}
      >
        <ArrowIcon width={20} height={20} />
      </TouchableOpacity>
      <Text style={styles.title}>Фільтри</Text>
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
});
