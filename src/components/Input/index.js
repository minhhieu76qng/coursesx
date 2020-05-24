import React from 'react';
import { Input as CustomInput } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

const styles = StyleSheet.create({
  inputStyle: {
    fontFamily: 'Quicksand-Regular',
  },
});

const StyledInput = ({ style, labelStyle, inputStyle, ...props }) => {
  const { colors } = useTheme();
  return (
    <CustomInput
      style={[styles.inputStyle, style]}
      labelStyle={[{ color: colors.textSecondary }, labelStyle]}
      inputStyle={[{ color: colors.text }, inputStyle]}
      {...props}
    />
  );
};

export default StyledInput;
