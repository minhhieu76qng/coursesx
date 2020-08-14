import React from 'react';
import { Button as CustomButton } from 'react-native-elements';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttonStyle: {
    fontFamily: 'Quicksand-Regular',
  },
});

const StyledButton = ({ style, titleStyle, type = 'solid', ...props }) => {
  return (
    <CustomButton
      type={type}
      titleStyle={[styles.buttonStyle, titleStyle]}
      containerStyle={[style]}
      {...props}
    />
  );
};

export default StyledButton;
