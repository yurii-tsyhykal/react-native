import 'react-native-gesture-handler';
import {View} from 'react-native';
import RootNavigation from './src/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  console.log('request', fetch('https://google.com'));
  return (
    <SafeAreaProvider>
      {
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={{flex: 1}}>
          <RootNavigation />
        </View>
      }
    </SafeAreaProvider>
  );
}

export default App;
