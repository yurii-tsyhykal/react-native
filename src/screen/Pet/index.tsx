import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IPets} from '../Home';
import {StackNavigationProp} from '@react-navigation/stack';
import {LoggedInStackType} from '../../navigation/types';
import {
  ArrowIcon,
  FavoriteIcon,
  LocationIcon,
  SliderArrowIcon,
} from '../../assets/icons';
import {useState} from 'react';
import {fonts} from '../../constants/fonts';
import DefaultBtn from '../../common/components/DefaultBtn';
import Modal from 'react-native-modal';
import ApplicationForm from '../../common/components/ApplicationForm';
import {useFavorites} from '../../context/favoritesContext';

export default function PetPage() {
  const [sliderIndex, setSliderIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const {isFavorite, toggleFavorite} = useFavorites();
  const route = useRoute<RouteProp<{params: {pet: IPets}}>>();
  const navigation = useNavigation<StackNavigationProp<LoggedInStackType>>();
  const pet = route?.params?.pet;

  const handleGoBack = () => {
    navigation.goBack();
  };
  const handleNext = () => {
    if (sliderIndex + 1 < route?.params?.pet?.images.length) {
      setSliderIndex(prevState => prevState + 1);
    } else {
      setSliderIndex(0);
    }
  };

  const handlePrev = () => {
    if (sliderIndex - 1 >= 0) {
      setSliderIndex(prevState => prevState - 1);
    } else {
      setSliderIndex(pet.images.length - 1);
    }
  };

  const handleOnCloseModal = () => setIsVisible(prev => !prev);
  if (!pet) {
    return (
      <View style={styles.noPet}>
        <Text>Немає даних про тварину</Text>
        <TouchableOpacity onPress={handleGoBack}>
          <Text style={styles.noPetBtnText}>Повернутись назад</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View>
        <ImageBackground
          style={styles.bgImage}
          source={{uri: pet.images[sliderIndex]}}
        >
          <View style={styles.mainContainer}>
            <TouchableOpacity
              onPress={handleGoBack}
              hitSlop={15}
              style={styles.backBtn}
            >
              <ArrowIcon width={20} height={20} color="white" />
            </TouchableOpacity>
            <View style={styles.sliderWrapper}>
              <TouchableOpacity
                style={styles.sliderArrowBtnLeft}
                onPress={handlePrev}
              >
                <SliderArrowIcon />
              </TouchableOpacity>
              <View style={styles.dotWrapper}>
                {pet.images.map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.activeDot,
                      i !== sliderIndex && styles.notActiveDot,
                    ]}
                  />
                ))}
              </View>
              <TouchableOpacity
                onPress={handleNext}
                style={styles.sliderArrowBtnRight}
              >
                <SliderArrowIcon />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.nameWrapper}>
          <View style={styles.titleContainer}>
            <View>
              <Text style={styles.titleText}>{pet.name}</Text>
              <View style={styles.locationContainer}>
                <LocationIcon color="#838383" />
                <Text style={styles.locationText}>{pet.location}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => toggleFavorite(pet)}
              style={styles.favBtn}
            >
              <FavoriteIcon isFavorite={isFavorite(pet)} />
            </TouchableOpacity>
          </View>

          <View style={styles.charactersContainer}>
            <Text style={styles.charactersTitle}>Характеристики:</Text>
            <View style={styles.characterContainer}>
              <View style={styles.characterWrapper}>
                <Text style={styles.characterText}>{`${pet.age} років`}</Text>
              </View>
              <View style={styles.characterWrapper}>
                <Text style={styles.characterText}>{pet.color}</Text>
              </View>
              <View style={styles.characterWrapper}>
                <Text style={styles.characterText}>{pet.type}</Text>
              </View>
              <View style={styles.characterWrapper}>
                <Text style={styles.characterText}>{pet.sex}</Text>
              </View>
              <View style={styles.characterWrapper}>
                <Text style={styles.characterText}>
                  {pet.isVaccinated ? 'Вакцинований' : 'Не вакцинований'}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.nameWrapper}>
            <Text style={styles.charactersTitle}>Опис:</Text>
            <View>
              <Text style={styles.characterText}>{pet.description}</Text>
            </View>
          </View>
          <DefaultBtn
            onPress={() => {
              handleOnCloseModal();
            }}
            text={'Подарувати сім’ю'}
          />
        </View>
      </View>
      <Modal isVisible={isVisible} onBackdropPress={() => handleOnCloseModal()}>
        <ApplicationForm onClose={() => setIsVisible(false)} />
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  noPet: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noPetBtnText: {color: 'blue', fontSize: 20, padding: 20},
  scrollView: {flex: 1},
  bgImage: {width: '100%', height: 400},
  mainContainer: {
    padding: 10,
    justifyContent: 'space-between',
    height: '100%',
  },
  backBtn: {
    transform: [{rotate: '180deg'}],
    alignSelf: 'flex-start',
  },
  sliderWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sliderArrowBtnLeft: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    width: 50,
    height: 50,
    borderRadius: 10,
    transform: [{rotate: '180deg'}],
  },
  dotWrapper: {flexDirection: 'row', gap: 3},
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: 'lightgray',
  },
  notActiveDot: {width: 9, height: 9, opacity: 0.5},
  sliderArrowBtnRight: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  nameWrapper: {
    margin: 10,
    gap: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    alignItems: 'center',
  },
  titleText: {fontFamily: fonts.ComfortaaRegular, fontSize: 24},
  locationContainer: {flexDirection: 'row', alignItems: 'center', gap: 10},
  locationText: {
    fontFamily: fonts.MontserratRegular,
    fontSize: 16,
    color: '#838383',
  },
  favBtn: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EAE9FB',
  },
  charactersContainer: {marginHorizontal: 10, gap: 10},
  charactersTitle: {fontFamily: fonts.ComfortaaRegular, fontSize: 18},
  characterContainer: {flexDirection: 'row', flexWrap: 'wrap', gap: 8},
  characterWrapper: {
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#EAE9FB',
  },
  characterText: {fontFamily: fonts.MontserratRegular, color: 'black'},
});
