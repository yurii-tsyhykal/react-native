import {StyleSheet, Text, View} from 'react-native';
import DefaultBtn from '../DefaultBtn';
import {fonts} from '../../../constants/fonts';
import {FallbackProps} from 'react-error-boundary';

export default function ErrorFallBack({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  const handleGoBack = () => {
    resetErrorBoundary();
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Opsss. Something went wrong</Text>
        <Text style={styles.subtitle}>
          An unexpected error has occurred. Please try reloading the
          application.
        </Text>
        <DefaultBtn onPress={handleGoBack} text={'Try again'} />
        {__DEV__ && (
          <View>
            <Text style={styles.title}>Details (for the devs):</Text>
            <Text style={styles.errorMessage}>{error.toString()}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  container: {width: '100%', gap: 20},
  title: {fontFamily: fonts.ComfortaaRegular, fontSize: 24},
  subtitle: {fontFamily: fonts.MontserratSemiBold},
  errorMessage: {fontFamily: 'monospace', fontSize: 12},
});
