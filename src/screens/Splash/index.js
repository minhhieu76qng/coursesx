import React, { useMemo, useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import * as Font from 'expo-font';
import AppLogo from 'components/AppLogo';
import routesName from 'constants/routesName';
import styles from './styles';

const Splash = ({ navigation }) => {
  const [loadingFont, setLoadingFont] = useState(true);

  const { width, height } = Dimensions.get('window');
  const logoWidth = useMemo(() => (width < height ? width * 0.6 : height * 0.6), [width, height]);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'Quicksand-Bold': require('assets/fonts/Quicksand-Bold.ttf'),
        'Quicksand-Regular': require('assets/fonts/Quicksand-Regular.ttf'),
        'Quicksand-Light': require('assets/fonts/Quicksand-Light.ttf'),
        'Quicksand-SemiBold': require('assets/fonts/Quicksand-SemiBold.ttf'),
        'Quicksand-Medium': require('assets/fonts/Quicksand-Medium.ttf'),
      });
      setLoadingFont(false);
    }
    loadFont();
  }, []);

  useEffect(() => {
    if (!loadingFont) {
      setTimeout(() => {
        navigation.navigate(routesName.appHome);
      }, 2000);
    }
  }, [loadingFont]);

  // load font

  return (
    <View style={styles.splashContainer}>
      <AppLogo width={logoWidth} />
    </View>
  );
};

export default Splash;
