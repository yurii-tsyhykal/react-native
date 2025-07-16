import React from 'react';
import {View} from 'react-native';
import RootNavigation from './src/navigation';

function App(): React.JSX.Element {
  console.log('request', fetch('https://google.com'));
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1}}>
      <RootNavigation />
    </View>
  );
}

export default App;
