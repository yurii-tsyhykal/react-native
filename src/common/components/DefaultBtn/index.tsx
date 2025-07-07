import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from '../../../screen/Auth/styles';

interface IDefaultBtn {
  disabled?: boolean;
  onPress: () => void;
  text: string;
}

export default function DefaultBtn({
  disabled = false,
  onPress,
  text,
}: IDefaultBtn) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.loginBtnContainer,
        // eslint-disable-next-line react-native/no-inline-styles
        disabled && {opacity: 0.5},
      ]}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
}
