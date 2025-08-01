import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Text, TouchableOpacity} from 'react-native';
import {RootStackNavigation} from '../../navigation/types';

export default function HomePage() {
  const navigation = useNavigation<StackNavigationProp<RootStackNavigation>>();
  const getData = () => {};
  return (
    <TouchableOpacity onPress={() => navigation.goBack}>
      <Text>Hello</Text>
    </TouchableOpacity>
  );
}
