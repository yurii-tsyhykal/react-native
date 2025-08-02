import {View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import PetsList from './components/PetsList';

export interface IPets {
  age: number;
  type: string;
  location: string;
  name: string;
  description: string;
  size: string;
  isVaccinated: boolean;
  images: [string];
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
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <PetsList pets={pets} />
    </>
  );
}
