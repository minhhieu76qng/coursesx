import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { Image } from 'react-native-elements';
import PropTypes from 'prop-types';
import logoDark from 'assets/images/logo_dark.png';
import logoLight from 'assets/images/logo_light.png';
import styles from './styles';

const AppLogo = ({ width }) => {
  const scheme = useColorScheme();
  const logo = useMemo(() => (scheme === 'dark' ? logoDark : logoLight), [scheme]);
  return (
    <View style={{ ...styles.logoWrapper, width, height: width }}>
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
