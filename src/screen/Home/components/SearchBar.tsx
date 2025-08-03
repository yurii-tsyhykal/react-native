import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SearchIcon from '../../../assets/icons/SearchIcon';
import {SettingsIcon} from '../../../assets/icons';

export default function SearchBar() {
  return (
    <View style={styles.mainWrapper}>
      <View style={styles.searchWrapper}>
        <View style={styles.searchIconWrapper}>
          <SearchIcon />
        </View>
        <TextInput placeholder="Пошук" />
      </View>
      <TouchableOpacity style={styles.settingsIcon}>
        <SettingsIcon />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {flexDirection: 'row', alignItems: 'center'},
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
  },
});
