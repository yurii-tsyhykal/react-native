import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

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
        styles.activeTabContainer,
        disabled && styles.disabledTabContainer,
      ]}
    >
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  activeTabContainer: {
    backgroundColor: '#7A71BA',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
  },
  disabledTabContainer: {opacity: 0.5},
  btnText: {color: 'white'},
});
