import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View, ViewStyle} from 'react-native';
import {NotVisibleIcon, VisibleIcon} from '../../../assets/icons';
import styles from '../../../screen/Auth/styles';

export interface IInput {
  onBlur?: () => void;
  value: string;
  onChangeText: (text: string) => void;
  placeholderColor?: string;
  placeholder?: string;
  error?: null | string;
  secureTextEntry?: boolean;
  additionalContainerStyle?: ViewStyle;
  additionalInputStyle?: ViewStyle;
  confirmPwdStyle?: ViewStyle;
  onFocus?: () => void;
}

export default function Input({
  onBlur,
  value,
  onChangeText,
  placeholderColor = '#838383',
  placeholder,
  error,
  secureTextEntry = false,
  additionalContainerStyle,
  additionalInputStyle,
  confirmPwdStyle,
  onFocus,
}: IInput) {
  const [isVisiblePassword, setIsVisiblePassword] = useState(secureTextEntry);

  return (
    <View style={confirmPwdStyle}>
      <View style={[styles.inputContainer, additionalContainerStyle]}>
        <TextInput
          placeholder={placeholder}
          style={[styles.input, additionalInputStyle]}
          placeholderTextColor={placeholderColor}
          onBlur={onBlur}
          onFocus={onFocus}
          value={value}
          onChangeText={text => onChangeText(text)}
          secureTextEntry={isVisiblePassword}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsVisiblePassword(!isVisiblePassword)}
            hitSlop={15}>
            {isVisiblePassword ? (
              <NotVisibleIcon fill={'#000000'} />
            ) : (
              <VisibleIcon fill={'#000000'} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {!!error && (
        <View style={styles.errorTextContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
}
