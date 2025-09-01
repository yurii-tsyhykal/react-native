import 'react-native-gesture-handler';
import {View} from 'react-native';
import RootNavigation from './src/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import styles from './src/screen/Auth/styles';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      {
        <View style={styles.appWrapper}>
          <RootNavigation />
        </View>
      }
    </SafeAreaProvider>
  );
}

export default App;
