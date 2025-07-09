import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styles from '../../styles';

export default function AuthLayout({children}: any) {
  return (
    <KeyboardAvoidingView
      style={styles.mainWrapper}
      keyboardVerticalOffset={Platform.select({android: 20, ios: 90})}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.contentWrapper}>{children}</View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
