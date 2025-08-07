import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SearchIcon from '../../../assets/icons/SearchIcon';
import {SettingsIcon} from '../../../assets/icons';
import {useEffect, useState} from 'react';

interface ISearchBar {
  handleSearch: (text: string) => void;
}

export default function SearchBar({handleSearch}: ISearchBar) {
  const [name, setName] = useState('');
  useEffect(() => {
    const timeout = setTimeout(() => {
      handleSearch(name);
    }, 500);
    return () => clearTimeout(timeout);
  }, [handleSearch, name]);
  return (
    <View style={styles.mainWrapper}>
      <View style={styles.searchWrapper}>
        <View style={styles.searchIconWrapper}>
          <SearchIcon width={16} height={16} />
        </View>
        <TextInput
          placeholder="Пошук"
          style={styles.input}
          value={name}
          onChangeText={(text: string) => setName(text.trim())}
        />
      </View>
      <TouchableOpacity style={styles.settingsIcon}>
        <SettingsIcon width={19} height={19} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {flexDirection: 'row', alignItems: 'center', marginBottom: 5},
  searchWrapper: {
    borderRadius: 20,
    backgroundColor: '#EFF1F4',
    height: 40,
    width: Dimensions.get('window').width - 70,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIconWrapper: {marginHorizontal: 20},
  settingsIcon: {
    height: 40,
    width: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF1F4',
  },
  input: {flex: 1},
});
