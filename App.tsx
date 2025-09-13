import 'react-native-gesture-handler';
import {View} from 'react-native';
import RootNavigation from './src/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import styles from './src/screen/Auth/styles';
import {FavoriteProvider} from './src/context/favoritesContext';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <FavoriteProvider>
        <View style={styles.appWrapper}>
          <RootNavigation />
        </View>
      </FavoriteProvider>
    </SafeAreaProvider>
  );
}

export default App;
