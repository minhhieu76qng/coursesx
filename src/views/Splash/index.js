import React, { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Dimensions } from 'react-native';
import * as Font from 'expo-font';
import AppLogo from 'components/AppLogo';
import screenName from 'constants/screenName';
import styles from './styles';
import { FETCH_USER_DATA } from '../../services/user/constants';
import { getCurrentUser } from '../../services/inapp/getters';

const Splash = ({ navigation }) => {
  const [loadedFont, setLoadedFont] = useState(false);
  const [isFetched, setFetched] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);

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
      setLoadedFont(true);
    }
    loadFont();
    dispatch({
      type: FETCH_USER_DATA,
      meta: {
        callback: () => {
          setFetched(true);
        },
      },
    });
  }, []);

  useEffect(() => {
    if (loadedFont && isFetched) {
      if (currentUser) {
        navigation.navigate(screenName.mainTab);
      } else {
        navigation.navigate(screenName.login);
      }
    }
  }, [loadedFont, isFetched, currentUser]);

  return (
    <View style={styles.splashContainer}>
      <AppLogo width={logoWidth} />
    </View>
  );
};

export default Splash;
