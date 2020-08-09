import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Icon from 'themes/Icon';
import styles from './styles';

const IconButton = ({
  color,
  onPress,
  disabledColor = null,
  disabled = false,
  containerStyle = {},
  name = '',
  size = 20,
  roundWidth = 10,
  roundButton = true,
}) => {
  const { colors } = useTheme();
  const buttonWidth = size + roundWidth;
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          width: buttonWidth,
          height: buttonWidth,
          borderRadius: roundButton ? buttonWidth / 2 : 0,
          backgroundColor: colors.iconBg,
        },
        containerStyle,
      ]}
      onPress={onPress}
      disabled
    >
      <Icon name={name} color={disabled ? disabledColor : color} size={size} />
    </TouchableOpacity>
  );
};

export default IconButton;
