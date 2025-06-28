import React from 'react';
import {View} from 'react-native';
import LoginPage from './src/screen/Auth/Login';

function App(): React.JSX.Element {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1}}>
      <LoginPage />
    </View>
  );
}

export default App;
