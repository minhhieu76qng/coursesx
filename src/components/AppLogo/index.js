import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Image } from 'react-native-elements';
import PropTypes from 'prop-types';
import logoDark from 'assets/images/logo_dark.png';
import logoLight from 'assets/images/logo_light.png';
import styles from './styles';

const AppLogo = ({ width, isDark = null }) => {
  const { dark } = useTheme();
  const logo = useMemo(() => {
    if (isDark === true) {
      return logoDark;
    }
    if (isDark === false) {
      return logoLight;
    }
    return dark ? logoDark : logoLight;
  }, [isDark, dark, logoLight, logoDark]);

  return (
    <View
      style={{ ...styles.logoWrapper, width, height: width, maxHeight: '100%', maxWidth: '100%' }}
    >
      <Image source={logo} containerStyle={styles.logoImg} />
    </View>
  );
};

AppLogo.propTypes = {
  width: PropTypes.number,
};

AppLogo.defaultProps = {
  width: 150,
};

export default AppLogo;
