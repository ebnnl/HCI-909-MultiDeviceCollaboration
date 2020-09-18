import {Platform} from 'react-native';

const ANDROID_ELEVATION = 10;
const SHADOW_OFFSET = {
  width: 0,
  height: 5,
};
const SHADOW_RADIUS = 6;
const SHADOW_OPACITY = 0.3;

const colors = {
  black: '#000000',
  grey: '#AAAAAA',
  darkGrey: '#858585',
  white: '#FFFFFF',
};
const dimensions = {
  button: 40,
};
export const shadow = Platform.select({
  ios: {
    shadowColor: colors.darkGrey,
    shadowOffset: SHADOW_OFFSET,
    shadowRadius: SHADOW_RADIUS,
    shadowOpacity: SHADOW_OPACITY,
  },
  android: {
    elevation: ANDROID_ELEVATION,
  },
});

export const theme = {
  colors,
  dimensions,
  shadow,
  gridUnit: 4,
};
