import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {fonts} from '../../../constants/fonts';
import { JSX } from 'react';

type OptionId = string | boolean | null;

export interface SwitchItem<T extends OptionId> {
  text: string;
  icon?: JSX.Element;
  id: T;
}

export interface SwitchBtnProps<T extends OptionId> {
  items: Array<SwitchItem<T>>;
  active: T;
  handleSwitch: (item: SwitchItem<T>) => void;
}

export default function SwitchBtn<T extends OptionId>({
  items,
  active,
  handleSwitch,
}: SwitchBtnProps<T>) {
  return (
    <View style={styles.switcherWrapper}>
      {items.map((i, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleSwitch(i)}
          style={
            active === i.id ? styles.switcherActive : styles.switcherNonActive
          }
        >
          {!!i.icon && <View style={styles.switcherIconWrapper}>{i.icon}</View>}
          <View
            style={[
              styles.switcherTextWrapper,
              !!i.icon && styles.switcherIconFlex,
            ]}
          >
            <Text style={styles.switcherText}>{i.text}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}



const styles = StyleSheet.create({
  switcherWrapper: {
    borderRadius: 50,
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#EAE9FB',
    height: 50,
    alignItems: 'center',
  },
  switcherTextWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switcherText: {fontFamily: fonts.MontserratRegular, color: '#0B0B0B'},
  switcherIconWrapper: {flex: 0.05},
  switcherIconFlex: {flex: 0.8},
  switcherActive: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.5,
    borderRadius: 50,
    backgroundColor: 'white',
    height: 40,
    paddingHorizontal: 10,
    gap: 20,
  },
  switcherNonActive: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.5,
    borderRadius: 50,
    borderColor: 'white',
    height: 40,
    paddingHorizontal: 10,
    gap: 20,
  },
});
