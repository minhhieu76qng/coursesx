import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'themes/Icon';
import { useTheme } from '@react-navigation/native';
import styles from './styles';

const IconButton = ({ color, onPress, containerStyle = {}, name = '', size = 20 }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPress}>
      <Icon name={name} color={color || colors.textSecondary} size={size} />
    </TouchableOpacity>
  );
};

export default IconButton;
