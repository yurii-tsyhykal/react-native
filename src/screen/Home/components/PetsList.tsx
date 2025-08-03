import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IPets} from '../index';
import {FavoriteIcon} from '../../../assets/icons';
import {fonts} from '../../../constants/fonts';

export default function PetsList({pets}: {pets: IPets[]}) {
  return (
    <View style={styles.mainWrapper}>
      <FlatList
        data={pets}
        style={styles.mainContainer}
        numColumns={2}
        renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.item}>
              <ImageBackground
                source={{
                  uri: item.images[0],
                }}
                imageStyle={styles.bgImage}
                style={styles.image}
                resizeMode="cover"
              >
                <TouchableOpacity style={styles.favIconBtn}>
                  <FavoriteIcon />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{item.type}</Text>
                  <Text style={styles.text}>{`${item.age} years`}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {flex: 1},
  mainContainer: {
    width: '100%',
    marginHorizontal: 10,
  },
  item: {
    backgroundColor: 'black',
    height: 200,
    width: Dimensions.get('window').width / 2 - 30,
    margin: 10,
    borderRadius: 20,
  },
  bgImage: {
    borderRadius: 20,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
    justifyContent: 'space-between',
  },
  favIconBtn: {
    alignSelf: 'flex-end',
    margin: 10,
  },
  textContainer: {margin: 15},
  text: {
    color: 'white',
    fontFamily: fonts.MontserratSemiBold,
  },
});
