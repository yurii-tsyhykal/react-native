import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {LoggedInStackType} from '../../navigation/types';
import {useState} from 'react';
import SwitchBtn from '../../common/components/SwitchBtn';
import {
  FemaleIcon,
  Male,
  MaleAndFemaleIcon,
  SearchIcon,
} from '../../assets/icons';
import DefaultBtn from '../../common/components/DefaultBtn';
import {ScreenNames} from '../../constants/screenNames';
import {fonts} from '../../constants/fonts';

export interface ISettings {
  timeStamp: boolean;
  isDog: boolean;
  sex: 'male' | 'female';
  size: 'big' | 'medium' | 'small';
  age: string;
  isVaccinated: boolean;
}

export default function Filter() {
  const navigation = useNavigation<StackNavigationProp<LoggedInStackType>>();
  const [settings, setSettings] = useState<ISettings>({
    timeStamp: false,
    isDog: true,
    sex: 'male',
    size: 'small',
    age: '1',
    isVaccinated: false,
  });

  const handleSwitchAnimal = (animal: {id: boolean}) => {
    setSettings(prev => ({...prev, isDog: animal.id}));
  };
  const handleSwitchSex = (animal: {id: 'male' | 'female'}) => {
    setSettings(prev => ({...prev, sex: animal.id}));
  };
  const handleSwitchSize = (animal: {id: 'big' | 'medium' | 'small'}) => {
    setSettings(prev => ({...prev, size: animal.id}));
  };
  const onTimeStamp = () => {
    setSettings(prev => ({
      ...prev,
      timeStamp: !prev.timeStamp,
    }));
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.mainWrapper}>
        <TouchableOpacity
          style={styles.TimeStampBtn}
          onPress={() => {
            onTimeStamp();
          }}
        >
          <View style={styles.activeTimeStamp}>
            {settings.timeStamp && <View style={styles.checkedTimeStampBtn} />}
          </View>
          <Text>Сортувати за датою додавання</Text>
        </TouchableOpacity>
        <SwitchBtn
          active={settings.isDog}
          handleSwitch={handleSwitchAnimal}
          items={[
            {text: 'Собаки', id: true},
            {text: 'Коти', id: false},
          ]}
        />
        <SwitchBtn
          active={settings.sex}
          handleSwitch={handleSwitchSex}
          items={[
            {text: 'Хлопець', icon: <Male />, id: 'male'},
            {text: 'Дівчина', icon: <FemaleIcon />, id: 'female'},
            {text: 'Будь-хто', icon: <MaleAndFemaleIcon />, id: 'any'},
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
        <View style={styles.ageWrapper}>
          <Text style={styles.labelText}>Вік, роки</Text>
          <View style={styles.ageInputWrapper}>
            <View style={styles.ageIconWrapper}>
              <SearchIcon />
            </View>
            <TextInput
              style={styles.ageInput}
              placeholder={'1'}
              keyboardType={'numeric'}
              value={settings.age.toString()}
              onChangeText={text => setSettings(prev => ({...prev, age: text}))}
            />
          </View>
        </View>
        <View style={styles.isVaccinatedWrapper}>
          <Text style={styles.labelText}>Вакцинація</Text>
          <TouchableOpacity
            style={[
              styles.isVaccinatedSwitcher,
              settings.isVaccinated && styles.isVaccinatedTrue,
            ]}
            onPress={() =>
              setSettings(prev => ({...prev, isVaccinated: !prev.isVaccinated}))
            }
          >
            <View style={styles.isVaccinatedCircle} />
          </TouchableOpacity>
        </View>
        <DefaultBtn
          text={'Показати варіанти'}
          onPress={() => {
            navigation.navigate(
              ScreenNames.DRAWER_STACK,
              {
                screen: ScreenNames.TAB_BAR_STACK,
                params: {
                  screen: ScreenNames.HOME_PAGE,
                  params: {
                    settings: settings,
                  },
                },
              },
            );
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {margin: 10, gap: 20},
  mainWrapper: {gap: 20},
  TimeStampBtn: {flexDirection: 'row', gap: 10, alignItems: 'center'},
  activeTimeStamp: {
    borderWidth: 1,
    borderColor: '#7A71BA',
    width: 15,
    height: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedTimeStampBtn: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: '#7A71BA',
  },

  ageWrapper: {gap: 5},
  labelText: {fontFamily: fonts.MontserratRegular, color: '#0B0B0B'},
  ageInputWrapper: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#A0A0A0',
    height: 50,
    width: Dimensions.get('window').width - 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  ageIconWrapper: {marginHorizontal: 20},
  ageInput: {
    flex: 1,
  },
  isVaccinatedWrapper: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  isVaccinatedSwitcher: {
    width: 50,
    borderRadius: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D0CBF1',
    padding: 3,
  },
  isVaccinatedCircle: {
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: '#7A71BA',
  },
  isVaccinatedTrue: {
    alignItems: 'flex-end',
    backgroundColor: '#D0CBF1',
  },
});
