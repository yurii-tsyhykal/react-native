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
  MaleIcon,
  MaleAndFemaleIcon,
  SearchIcon,
} from '../../assets/icons';
import DefaultBtn from '../../common/components/DefaultBtn';
import {ScreenNames} from '../../constants/screenNames';
import {fonts} from '../../constants/fonts';

export interface ISettings {
  timeStamp: boolean;
  isDog: boolean | null;
  sex: 'male' | 'female' | null;
  size: 'big' | 'medium' | 'small' | null;
  age: string;
  isVaccinated: boolean | null;
}

export default function Filter() {
  const navigation = useNavigation<StackNavigationProp<LoggedInStackType>>();

  const [settings, setSettings] = useState<ISettings>({
    timeStamp: false,
    isDog: null,
    sex: null,
    size: null,
    age: '',
    isVaccinated: null,
  });

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.mainWrapper}>
        <TouchableOpacity
          style={styles.TimeStampBtn}
          onPress={() =>
            setSettings(prev => ({...prev, timeStamp: !prev.timeStamp}))
          }
        >
          <View style={styles.activeTimeStamp}>
            {settings.timeStamp && <View style={styles.checkedTimeStampBtn} />}
          </View>
          <Text>Сортувати за датою додавання</Text>
        </TouchableOpacity>

        <SwitchBtn<boolean | null>
          active={settings.isDog}
          handleSwitch={opt => setSettings(prev => ({...prev, isDog: opt.id}))}
          items={[
            {text: 'Собаки', id: true},
            {text: 'Коти', id: false},
          ]}
        />

        <SwitchBtn<'male' | 'female' | null>
          active={settings.sex}
          handleSwitch={opt => setSettings(prev => ({...prev, sex: opt.id}))}
          items={[
            {text: 'Хлопець', icon: <MaleIcon />, id: 'male'},
            {text: 'Дівчина', icon: <FemaleIcon />, id: 'female'},
            {text: 'Будь-хто', icon: <MaleAndFemaleIcon />, id: null},
          ]}
        />

        <SwitchBtn<'big' | 'medium' | 'small' | null>
          active={settings.size}
          handleSwitch={opt => setSettings(prev => ({...prev, size: opt.id}))}
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
              value={settings.age}
              onChangeText={text =>
                setSettings(prev => ({
                  ...prev,
                  age: text,
                }))
              }
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
              setSettings(prev => {
                if (prev.isVaccinated === null) {
                  return {...prev, isVaccinated: true};
                }
                if (prev.isVaccinated === true) {
                  return {...prev, isVaccinated: false};
                }
                return {...prev, isVaccinated: null};
              })
            }
          >
            <View style={styles.isVaccinatedCircle} />
          </TouchableOpacity>
        </View>

        <DefaultBtn
          text={'Показати варіанти'}
          onPress={() => {
            navigation.navigate(ScreenNames.DRAWER_STACK, {
              screen: ScreenNames.TAB_BAR_STACK,
              params: {
                screen: ScreenNames.HOME_PAGE,
                params: {
                  settings: settings,
                },
              },
            });
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
