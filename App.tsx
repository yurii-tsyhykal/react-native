import React from 'react';
import {View} from 'react-native';
import Registration from './src/screen/Auth/Registration';

function App(): React.JSX.Element {
  console.log('request', fetch('https://google.com'));
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1}}>
      <Registration />
    </View>
  );
}

export default App;
