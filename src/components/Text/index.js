import React from 'react';
import { Text as CustomText, StyleSheet } from 'react-native';
import colors from 'themes/colors';

const styles = StyleSheet.create({
  h1: {
    fontSize: 40,
    fontFamily: 'Quicksand-Bold',
  },
  h2: {
    fontSize: 32,
    fontFamily: 'Quicksand-Regular',
  },
  h3: {
    fontSize: 24,
    fontFamily: 'Quicksand-Regular',
  },
  h4: {
    fontSize: 16,
    fontFamily: 'Quicksand-Medium',
  },
  body: {
    fontSize: 16,
    fontFamily: 'Quicksand-Regular',
  },
  subbody: {
    fontSize: 14,
    fontFamily: 'Quicksand-Regular',
  },
  'subbody-light': {
    fontSize: 14,
    fontFamily: 'Quicksand-Light',
  },
  description: {
    fontSize: 12,
    fontFamily: 'Quicksand-Regular',
  },
  button: {
    fontSize: 20,
    fontFamily: 'Quicksand-Medium',
  },
});

const weightMapping = {
  bold: 'Quicksand-Bold',
  regular: 'Quicksand-Regular',
  medium: 'Quicksand-Medium',
  light: 'Quicksand-Light',
};

const StyledText = ({ type = 'body', color, size, weight, style, ...props }) => {
  const textWeight = type ? weight : weight || 'regular';
  return (
    <CustomText
      style={[
        styles[type],
        color ? { color: colors[color] || color } : {},
        size ? { fontSize: size } : {},
        textWeight ? { fontFamily: weightMapping[textWeight] } : {},
        style,
      ]}
      {...props}
    />
  );
};

export { weightMapping as textWeightMapping };

export default StyledText;
