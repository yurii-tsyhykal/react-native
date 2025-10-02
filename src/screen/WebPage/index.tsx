import {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import WebView, {WebViewMessageEvent} from 'react-native-webview';

const injectedJS = `(function () {
  window.addEventListener('load', () => {
    window.ReactNativeWebView.postMessage(JSON.stringify({message: 'website'}));
  });
})();
true`;

export default function WepPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleMessage = (event: WebViewMessageEvent) => {
    try {
      const response = JSON.parse(event.nativeEvent.data);
      console.log('response:', response.message);
    } catch (error) {
      console.error('Failed to parse message:', error);
    }
  };
  return (
    <View style={styles.container}>
      <WebView
        style={styles.webview}
        source={{
          uri: 'https://github.com/react-native-webview/react-native-webview/tree/master',
        }}
        javaScriptEnabled={true}
        nestedScrollEnabled={true}
        onMessage={handleMessage}
        injectedJavaScript={injectedJS}
        onShouldStartLoadWithRequest={() => true}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        onError={e => {
          const {nativeEvent} = e;
          console.warn('WebView error: ', nativeEvent);
          setIsLoading(false);
        }}
        onHttpError={e => {
          const {nativeEvent} = e;
          console.warn('WebView HTTP error: ', nativeEvent);
        }}
      />
      {isLoading && (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator
            style={styles.indicator}
            size="large"
            color="#7A71BA"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  indicatorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  indicator: {
    transform: [{scale: 2}],
  },
});
