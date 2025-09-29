import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CheckIcon, ENIcon, PLIcon, UKIcon} from '../../assets/icons';
import FilterHeader from '../../common/components/FilterHeader';
import {useState} from 'react';
import {fonts} from '../../constants/fonts';
import {useTranslation} from 'react-i18next';

const languages = [
  {code: 'pl', icon: <PLIcon />, text: 'Polska'},
  {code: 'uk', icon: <UKIcon />, text: 'Українська'},
  {code: 'en', icon: <ENIcon />, text: 'English'},
];

export default function LanguagesPage() {
  const {t, i18n} = useTranslation();
  const [selected, setSelected] = useState(i18n.language);
  const selectLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setSelected(code);
  };
  return (
    <View>
      <FilterHeader title={t('common.headers.lngSettings')} variant="language" />
      <View style={styles.lngsWrapper}>
        {languages.map(i => (
          <TouchableOpacity
            style={[styles.lngBtn, selected === i.code && styles.selectedLng]}
            key={i.code}
            onPress={() => selectLanguage(i.code)}
          >
            <View style={styles.iconContainer}>
              {i.icon}
              <Text style={styles.text}>{i.text}</Text>
            </View>
            {selected === i.code && <CheckIcon />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lngsWrapper: {margin: 10, gap: 10},
  lngBtn: {
    borderRadius: 50,
    borderColor: '#838383',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    paddingVertical: 12,
  },
  selectedLng: {backgroundColor: '#EAE9FB'},
  iconContainer: {alignItems: 'center', flexDirection: 'row', gap: 20},
  text: {fontFamily: fonts.MontserratRegular, fontSize: 20},
});
