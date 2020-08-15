import React, { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Dimensions } from 'react-native';
import AppLogo from 'components/AppLogo';
import screenName from 'constants/screenName';
import styles from './styles';
import { BOOT } from '../../services/user/constants';
import { getCurrentUser } from '../../services/inapp/getters';
import { showFlashMessage } from '../../services/inapp/actions';

const Splash = ({ navigation }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);

  const { width, height } = Dimensions.get('window');
  const logoWidth = useMemo(() => (width < height ? width * 0.6 : height * 0.6), [width, height]);

  useEffect(() => {
    dispatch({
      type: BOOT,
      meta: {
        afterSuccess: () => {
          if (currentUser) {
            navigation.navigate(screenName.mainTab);
          } else {
            navigation.replace(screenName.login);
          }
        },
        afterFail: () => {
          dispatch(
            showFlashMessage({
              description: 'Fail to load app',
            }),
          );
          navigation.replace(screenName.login);
        },
      },
    });
  }, [dispatch]);

  return (
    <View style={styles.splashContainer}>
      <AppLogo width={logoWidth} />
    </View>
  );
};

export default Splash;
