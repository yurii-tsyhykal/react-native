import {collection, getDocs, query, QuerySnapshot} from 'firebase/firestore';
import {useEffect, useState} from 'react';
import PetsList from '../../common/components/PetList/PetsList';
import {StyleSheet, View} from 'react-native';
import {db} from '../../config/firebaseConfig';
import SearchBar from '../../common/components/SearchBar/SearchBar';
import {RouteProp, useRoute} from '@react-navigation/native';
import {ISettings} from '../Filter';
import algoliaFetch from '../../utils/algoliaFetch';

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
  const [searchText, setSearchText] = useState('');
  const route = useRoute<RouteProp<{params: {settings: ISettings}}>>();
  const filterSettings = route.params?.settings;

  useEffect(() => {
    const handleSearch = async () => {
      if (searchText.trim().length > 0) {
        const result = await algoliaFetch({
          text: searchText,
          attributes: ['type'],
        });
        setPets(result);
        return;
      }

      if (filterSettings) {
        const result = await algoliaFetch({
          text: '',
          filter: filterSettings ?? undefined,
        });
        setPets(result);
        return;
      }

      const q = query(collection(db, 'animals'));
      const querySnapshot = await getDocs(q);

      const result = extractData(querySnapshot);
      setPets(result);
    };
    const timeout = setTimeout(() => {
      handleSearch();
    }, 500);
    return () => clearTimeout(timeout);
  }, [filterSettings, searchText]);
  return (
    <View style={styles.wrapper}>
      <SearchBar
        searchValue={searchText}
        onSearchChange={setSearchText}
        pets={pets}
      />
      <PetsList pets={pets} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
