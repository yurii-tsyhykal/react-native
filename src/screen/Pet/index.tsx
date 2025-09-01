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
import {ArrowIcon, HeartIcon} from '../../assets/icons';
import {useState} from 'react';

export default function PetPage() {
  const [sliderIndex, setSliderIndex] = useState<number>(0);
  const route = useRoute<RouteProp<{params: {pet: IPets}}>>();
  const navigation = useNavigation<StackNavigationProp<LoggedInStackType>>();
  const uri = route?.params?.pet?.images[sliderIndex];

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View>
        <ImageBackground style={styles.bgImage} source={{uri: uri}}>
          <View style={styles.mainContainer}>
            <TouchableOpacity
              onPress={handleGoBack}
              hitSlop={15}
              style={styles.backBtn}
            >
              <ArrowIcon width={20} height={20} color="white" />
            </TouchableOpacity>
            <View style={styles.sliderWrapper}>
              <TouchableOpacity></TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        <View>
          <View>
            <View>
              <Text></Text>
              <View>
                <Text></Text>
              </View>
            </View>
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
});
