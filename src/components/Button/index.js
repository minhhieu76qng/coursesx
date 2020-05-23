import React from 'react';
import { Button as CustomButton } from 'react-native-elements';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttonStyle: {
    fontFamily: 'Quicksand-Regular',
  },
});

const StyledButton = ({ style, titleStyle, ...props }) => {
  return (
    <CustomButton
      titleStyle={{ ...styles.buttonStyle, ...titleStyle }}
      style={styles.buttonStyle}
      {...props}
    />
  );
};

export default StyledButton;
