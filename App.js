import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MenuProvider } from 'react-native-popup-menu';
import FlashMessage from 'components/FlashMessage';
import { I18nextProvider } from 'react-i18next';
import AppNavigator from './src/navigation/AppNavigator';
import store from './src/store';
import i18n from './src/i18n';
import { AxiosInstance } from './src/services/Api';
import AsyncStorage from './src/utils/asyncStorage';
import { UNAUTHORIZED } from './src/constants';
import { LOGOUT } from './src/services/user/constants';

const App = () => {
  useEffect(() => {
    const reqInterceptor = AxiosInstance.interceptors.request.use(
      async (config) => {
        const request = config;
        try {
          request.headers['Content-Type'] = 'application/json';
          const token = await AsyncStorage.getAccessToken();
          request.headers.Authorization = `Bearer ${token}`;
        } catch (e) {
          console.log('request interceptor', e);
        } finally {
          // eslint-disable-next-line no-unsafe-finally
          return request;
        }
      },
      (error) => {
        console.log('request error', error);
        return Promise.reject(error);
      },
    );

    const resInterceptor = AxiosInstance.interceptors.response.use(
      (config) => {
        return config;
      },
      (error) => {
        if (error?.response?.status === UNAUTHORIZED) {
          store.dispatch(LOGOUT);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      AxiosInstance.interceptors.request.eject(reqInterceptor);
      AxiosInstance.interceptors.response.eject(resInterceptor);
    };
  }, []);
  return (
    <MenuProvider>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <SafeAreaProvider>
            <AppNavigator />
          </SafeAreaProvider>
          <FlashMessage />
        </Provider>
      </I18nextProvider>
    </MenuProvider>
  );
};

export default App;
