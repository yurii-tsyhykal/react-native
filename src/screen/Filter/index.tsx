import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {TabBarStackType} from '../../navigation/types';
import {useState} from 'react';
import SwitchBtn from '../../common/components/SwitchBtn';
import {PawIcon, SearchIcon} from '../../assets/icons';
import DefaultBtn from '../../common/components/DefaultBtn';
import {ScreenNames} from '../../constants/screenNames';

export interface ISettings {
  sortByTime: boolean;
  selectedAnimal: boolean;
  selectedSex: 'male' | 'female';
  size: 'big' | 'medium' | 'small';
  age: string;
  isVaccinate: boolean;
}

export default function Filter() {
  const navigation = useNavigation<StackNavigationProp<TabBarStackType>>();
  const [settings, setSettings] = useState<ISettings>({
    sortByTime: false,
    selectedAnimal: true,
    selectedSex: 'male',
    size: 'small',
    age: '1',
    isVaccinate: false,
  });

  const handleSwitchAnimal = (animal: {id: boolean}) => {
    setSettings(prevState => ({...prevState, selectedAnimal: animal.id}));
  };
  const handleSwitchSex = (animal: {id: 'male' | 'female'}) => {
    setSettings(prevState => ({...prevState, selectedSex: animal.id}));
  };
  const handleSwitchSize = (animal: {id: 'big' | 'medium' | 'small'}) => {
    setSettings(prevState => ({...prevState, size: animal.id}));
  };
  const onSortByTime = () => {
    setSettings(prevState => ({
      ...prevState,
      sortByTime: !prevState.sortByTime,
    }));
  };

  return (
    <ScrollView>
      <View>
        <TouchableOpacity>
          <View></View>
          <Text>Сортувати за датою додавання</Text>
        </TouchableOpacity>
        <SwitchBtn
          active={settings.selectedAnimal}
          handleSwitch={handleSwitchAnimal}
          items={[
            {text: 'Собаки', id: true},
            {text: 'Коти', id: false},
          ]}
        />
        <SwitchBtn
          active={settings.selectedSex}
          handleSwitch={handleSwitchSex}
          items={[
            {text: 'Хлопець', icon: <PawIcon />, id: 'male'},
            {text: 'Дівчина', icon: <PawIcon />, id: 'female'},
            {text: 'Будь-хто', icon: <PawIcon />, id: 'any'},
          ]}
        />
        <SwitchBtn
          active={settings.size}
          handleSwitch={handleSwitchSize}
          items={[
            {text: 'Маленькі', id: 'small'},
            {text: 'Середні', id: 'medium'},
            {text: 'Великі', id: 'big'},
          ]}
        />
        <View>
          <Text></Text>
          <View>
            <View>
              <SearchIcon />
            </View>
            <TextInput />
          </View>
        </View>
        <View>
          <Text></Text>
          <TouchableOpacity>
            <View />
          </TouchableOpacity>
        </View>
        <DefaultBtn
          text={'Показати варіанти'}
          onPress={() => {
            navigation.navigate(ScreenNames.HOME_PAGE);
          }}
        />
      </View>
    </ScrollView>
  );
}
