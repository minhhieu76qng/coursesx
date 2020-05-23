import React from 'react';
import { Input as CustomInput } from 'react-native-elements';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  inputStyle: {
    fontFamily: 'Quicksand-Regular',
  },
});

const StyledInput = ({ style, ...props }) => {
  return <CustomInput style={{ ...styles.inputStyle, ...style }} {...props} />;
};

export default StyledInput;
