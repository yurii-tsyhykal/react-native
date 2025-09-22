import {Text, TouchableOpacity, View} from 'react-native';
import {ENIcon, HeartIcon, PLIcon, UKIcon} from '../../assets/icons';
import FilterHeader from '../../common/components/FilterHeader';
import {useState} from 'react';
import {i18n} from '../../i18n';

const languages = [
  {code: 'pl', icon: <PLIcon />, text: 'Polska'},
  {code: 'uk', icon: <UKIcon />, text: 'Українська'},
  {code: 'en', icon: <ENIcon />, text: 'English'},
];

export default function LanguagesPage() {
  const [selected, setSelected] = useState(i18n.language);
  return (
    <View>
      <FilterHeader title={'Налаштування мови'} />
      <View>
        {languages.map(i => (
          <TouchableOpacity id={i.code}>
            <View>
              {i.icon}
              <Text>{i.text}</Text>
            </View>
            {selected === i.code && <HeartIcon />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
