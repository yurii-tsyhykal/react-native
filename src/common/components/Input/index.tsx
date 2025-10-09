import React, {useState} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {NotVisibleIcon, VisibleIcon} from '../../../assets/icons';
import {fonts} from '../../../constants/fonts';

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
  isAppForm?: boolean;
  labelName?: string;
  additionalLabelNameStyle?: ViewStyle;
  numberOfLines?: number;
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
  isAppForm,
  labelName,
  additionalLabelNameStyle,
  numberOfLines = 1,
}: IInput) {
  const [isVisiblePassword, setIsVisiblePassword] = useState(secureTextEntry);
  const isMultiline = numberOfLines > 1;
  return (
    <View style={confirmPwdStyle}>
      {isAppForm && (
        <Text style={[styles.labelName, additionalLabelNameStyle]}>
          {labelName}
        </Text>
      )}
      <View style={[styles.inputContainer, additionalContainerStyle]}>
        <TextInput
          placeholder={placeholder}
          style={[
            styles.input,
            additionalInputStyle,
            isMultiline && styles.multiline,
          ]}
          placeholderTextColor={placeholderColor}
          onBlur={onBlur}
          onFocus={onFocus}
          value={value}
          onChangeText={text => onChangeText(text)}
          secureTextEntry={isVisiblePassword}
          numberOfLines={isMultiline ? numberOfLines : undefined}
          multiline={isMultiline}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsVisiblePassword(!isVisiblePassword)}
            hitSlop={15}
          >
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

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderRadius: 25,
    margin: 0,
    paddingVertical: Platform.select({
      android: 0,
      ios: 14,
      default: 0,
    }),
    paddingHorizontal: 24,
    paddingRight: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelName: {
    fontFamily: fonts.MontserratMedium,
    paddingLeft: 24,
  },
  input: {
    width: '100%',
    paddingVertical: 12,
  },
  errorTextContainer: {
    height: 12,
    position: 'relative',
    padding: 0,
  },
  errorText: {
    color: 'red',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  multiline: {
    textAlignVertical: 'top',
  },
});
