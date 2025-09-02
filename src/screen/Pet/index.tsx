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
  HeartIcon,
  LocationIcon,
  SliderArrowIcon,
} from '../../assets/icons';
import {useState} from 'react';
import {fonts} from '../../constants/fonts';

export default function PetPage() {
  const [sliderIndex, setSliderIndex] = useState<number>(0);
  const route = useRoute<RouteProp<{params: {pet: IPets}}>>();
  const navigation = useNavigation<StackNavigationProp<LoggedInStackType>>();
  const pet = route?.params?.pet;

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePrev = () => {
    if (sliderIndex - 1 >= 0) {
      setSliderIndex(prevState => prevState - 1);
    } else {
      setSliderIndex(pet.images.length);
    }
  };

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
              <TouchableOpacity style={styles.sliderArrowBtnRight}>
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
            <TouchableOpacity style={styles.favContainer}>
              <FavoriteIcon />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <HeartIcon />
          </TouchableOpacity>
        </View>
        <View>
          <Text></Text>
          <View>
            <Text></Text>
          </View>
          <View>
            <Text></Text>
          </View>
          <View>
            <Text></Text>
          </View>
          <View>
            <Text></Text>
          </View>
          <View>
            <Text></Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  favContainer: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EAE9FB',
  },
});
