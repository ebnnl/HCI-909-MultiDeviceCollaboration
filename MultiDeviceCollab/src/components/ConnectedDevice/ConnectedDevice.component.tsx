import React, {FunctionComponent} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Text,
  TextStyle,
} from 'react-native';
import {Device} from 'react-native-ble-plx';
import {theme} from '../../../theme';

interface Props {
  device: Partial<Device>;
  color: string;
  onPress: () => void;
}
interface Styles {
  container: ViewStyle;
  deviceName: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    ...theme.shadow,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2 * theme.gridUnit,
    margin: 2 * theme.gridUnit,
    borderRadius: theme.dimensions.button / 2,
    width: theme.dimensions.button,
    height: theme.dimensions.button,
  },
  deviceName: {
    flex: 1,
    color: theme.colors.black,
    fontSize: 10,
  },
});

export const ConnectedDevice: FunctionComponent<Props> = ({
  device,
  color,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: color}]}
      onPress={onPress}>
      <Text>{device.name}</Text>
    </TouchableOpacity>
  );
};
