import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import PetsList from './components/PetsList';
import {StyleSheet, View} from 'react-native';
import SearchBar from './components/SearchBar';

export interface IPets {
  age: number;
  type: string;
  location: string;
  name: string;
  description: string;
  size: string;
  isVaccinated: boolean;
  images: string[];
  sex: string;
  isDog: boolean;
  color: string;
  timeStamp: number;
}

export default function HomePage() {
  const [pets, setPets] = useState<IPets[]>([]);

  const getData = async () => {
    try {
      const data = await firestore().collection('animals').get();
      const result: IPets[] = data.docs.map(i => i.data()) as IPets[];
      setPets(result);
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  };
  const handleSearch = async (text: string) => {
    const toUpper = text.charAt(0).toUpperCase() + text.slice(1);
    try {
      const data = await firestore()
        .collection('animals')
        .orderBy('type')
        .startAt(toUpper)
        .endAt(toUpper + '\uf8ff')
        .get();

      const result: IPets[] = data.docs.map(i => i.data()) as IPets[];
      setPets(result);
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={styles.wrapper}>
      <SearchBar handleSearch={handleSearch} />
      <PetsList pets={pets} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
