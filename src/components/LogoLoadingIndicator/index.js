import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';
import AppLogo from 'components/AppLogo';
import styles from './styles';

const LogoLoadingIndicator = ({ logoWidth = 150, indicatorSize = 'small', indicatorColor }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.categoryPlaceholder}>
      <View style={styles.logoWrapper}>
        <AppLogo width={logoWidth} />
      </View>
      <ActivityIndicator
        style={styles.indicator}
        color={indicatorColor || colors.primary}
        size={indicatorSize}
      />
    </View>
  );
};

export default LogoLoadingIndicator;
