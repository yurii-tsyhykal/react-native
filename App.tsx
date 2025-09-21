import 'react-native-gesture-handler';
import {View} from 'react-native';
import RootNavigation from './src/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import styles from './src/screen/Auth/styles';
import {FavoriteProvider} from './src/context/FavoritesContext';
import ErrorFallBack from './src/common/components/ErrorFallBack';
import {ErrorBoundary} from 'react-error-boundary';
import './src/i18n/index';

function App(): React.JSX.Element {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallBack}>
      <SafeAreaProvider>
        <FavoriteProvider>
          <View style={styles.appWrapper}>
            <RootNavigation />
          </View>
        </FavoriteProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

export default App;
