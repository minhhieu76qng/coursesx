import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Dark, Light } from 'themes/MyTheme';
import { getThemeMode } from 'getters/inApp';
import { themeMode } from 'constants';

import { authRoutes, appTabRoutes } from 'routes';

const Stack = createStackNavigator();

const customDark = {
  ...DarkTheme,
  // colors: { ...Dark },
  ...Dark,
};

const customLight = {
  ...DefaultTheme,
  // colors: { ...Light },
  ...Light,
};

const AppNavigator = () => {
  const currentTheme = useSelector(getThemeMode) || null;
  const scheme = useColorScheme();
  const theme = useMemo(() => {
    if (currentTheme === themeMode.dark) {
      return customDark;
    }
    if (currentTheme === themeMode.light) {
      return customLight;
    }

    return scheme === 'dark' ? customDark : customLight;
  }, [currentTheme, customDark, customLight]);
  return (
    <AppearanceProvider>
      <NavigationContainer theme={theme}>
        {/* <NavigationContainer theme={customDark}> */}
        <Stack.Navigator initialRouteName={authRoutes.splash.name}>
          <Stack.Screen
            name={authRoutes.splash.name}
            component={authRoutes.splash.component}
            options={authRoutes.splash.options}
          />
          <Stack.Screen
            name={authRoutes.login.name}
            component={authRoutes.login.component}
            options={authRoutes.login.options}
          />
          <Stack.Screen
            name={authRoutes.register.name}
            component={authRoutes.register.component}
            options={authRoutes.register.options}
          />
          <Stack.Screen
            name={authRoutes.forgotPassword.name}
            component={authRoutes.forgotPassword.component}
            options={authRoutes.forgotPassword.options}
          />
          <Stack.Screen
            name={authRoutes.verifyAccount.name}
            component={authRoutes.verifyAccount.component}
            options={authRoutes.verifyAccount.options}
          />
          <Stack.Screen
            name={appTabRoutes.appHome.name}
            component={appTabRoutes.appHome.component}
            options={appTabRoutes.appHome.options}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
};

export default AppNavigator;
