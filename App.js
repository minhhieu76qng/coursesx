import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MenuProvider } from 'react-native-popup-menu';
import FlashMessage from 'components/FlashMessage';
import { I18nextProvider } from 'react-i18next';
import AppNavigator from './src/navigation/AppNavigator';
import store from './src/store';
import i18n from './src/i18n';

const App = () => {
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
