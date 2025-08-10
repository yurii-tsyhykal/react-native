import {Text, TouchableOpacity, View} from 'react-native';

interface IItems {
  items: {
    text: string;
    icon?: JSX.Element;
    id: string | boolean;
  }[];
  active: string | boolean;
  handleSwitch: (text: {id: string | boolean}) => void;
}

export default function SwitchBtn({items, active, handleSwitch}: IItems) {
  return (
    <View>
      {items.map((i, index) => (
        <TouchableOpacity key={index} onPress={() => handleSwitch(i)}>
          {!!i.icon && <View>{i.icon}</View>}
          <View>
            <Text>{i.text}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
