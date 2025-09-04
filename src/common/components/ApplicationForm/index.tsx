import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {fonts} from '../../../constants/fonts';
import {CloseIcon} from '../../../assets/icons';

export default function ApplicationForm() {
  return (
    <View style={styles.headerFormContainer}>
      <View style={styles.titleFormContainer}>
        <Text style={styles.titleForm}>Забрати хвостика додому</Text>
        <Text style={styles.subtitleForm}>
          Залиште свої дані і ми з Вами зв’яжемося
        </Text>
      </View>
      <TouchableOpacity>
        <CloseIcon />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerFormContainer: {
    flexDirection: 'row',
  },
  titleFormContainer: {gap: 10},
  titleForm: {fontFamily: fonts.ComfortaaRegular, fontSize: 24},
  subtitleForm: {fontFamily: fonts.MontserratRegular},
});
