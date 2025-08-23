import {
  collection,
  endAt,
  getDocs,
  orderBy,
  query,
  QuerySnapshot,
  startAt,
} from 'firebase/firestore';
import {useEffect, useState} from 'react';
import PetsList from '../../common/components/PetList/PetsList';
import {StyleSheet, View} from 'react-native';
import {db} from '../../config/firebaseConfig';
import SearchBar from '../../common/components/SearchBar/SearchBar';
import {RouteProp, useRoute} from '@react-navigation/native';
import {ISettings} from '../Filter';

export interface IPets {
  age: number;
  type: string;
  location: string;
  name: string;
  description: string;
  size: 'big' | 'medium' | 'small';
  isVaccinated: boolean;
  images: string[];
  sex: string;
  isDog: boolean;
  color: string;
  timeStamp: number;
}

function extractData(snapshot: QuerySnapshot): IPets[] {
  const result = snapshot.docs.map(doc => doc.data() as IPets);
  return result;
}

export default function HomePage() {
  const [pets, setPets] = useState<IPets[]>([]);
  const route = useRoute<RouteProp<{params: {settings: ISettings}}>>();
  console.log(route);

  const getData = async () => {
    try {
      const q = query(collection(db, 'animals'));
      const querySnapshot = await getDocs(q);

      const result = extractData(querySnapshot);
      setPets(result);
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  };
  const handleSearch = async (text: string) => {
    if (text.trim().length === 0) {
      return;
    }
    const toUpper = text.charAt(0).toUpperCase() + text.slice(1);
    try {
      const q = query(
        collection(db, 'animals'),
        orderBy('type'),
        startAt(toUpper),
        endAt(toUpper + '\uf8ff'),
      );
      const querySnapshot = await getDocs(q);
      const result = extractData(querySnapshot);
      setPets(result);
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  };

  const handleSearchWithFilter = async (settings: ISettings) => {
    try {
    } catch (error) {
      console.log(`ERROR FILTER: ${error}`);
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
