import React from 'react';
import CustomIcon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';

export default function Icon({ color, size = 20, name = '', ...other }) {
  const { colors } = useTheme();
  return <CustomIcon color={color || colors.text} name={name} size={size} {...other} />;
}
