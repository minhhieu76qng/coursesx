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
      containerStyle={style}
      labelStyle={[styles.inputStyle, { color: colors.textSecondary }, labelStyle]}
      inputStyle={[styles.inputStyle, { color: colors.text }, inputStyle]}
      {...props}
    />
  );
};

export default StyledInput;
