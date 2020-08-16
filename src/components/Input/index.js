import React from 'react';
import { Input as CustomInput } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

const styles = StyleSheet.create({
  inputStyle: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 16,
  },
  fontPlaceholder: {
    fontSize: 13,
  },
});

const StyledInput = ({ style, labelStyle, inputStyle, value, ...props }) => {
  const { colors } = useTheme();
  return (
    <CustomInput
      containerStyle={style}
      labelStyle={[styles.inputStyle, { color: colors.textSecondary }, labelStyle]}
      inputStyle={[
        styles.inputStyle,
        { color: colors.text },
        !value && styles.fontPlaceholder,
        inputStyle,
      ]}
      placeholderTextColor={colors.textSecondary}
      {...props}
    />
  );
};

export default StyledInput;
