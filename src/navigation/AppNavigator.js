import React from 'react';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Dark, Light } from 'themes/MyTheme';

import { authRoutes, appTabRoutes } from 'routes';
// import authRoutes from 'routes/authenticationRoutes';

console.log(authRoutes);

const Stack = createStackNavigator();

const customDark = {
  ...DarkTheme,
  colors: { ...Dark },
};

const customLight = {
  ...DefaultTheme,
  colors: { ...Light },
};

const AppNavigator = () => {
  const scheme = useColorScheme();
  return (
    <AppearanceProvider>
      <NavigationContainer theme={scheme === 'dark' ? customDark : customLight}>
        {/* <NavigationContainer theme={customDark}> */}
        <Stack.Navigator initialRouteName={appTabRoutes.appHome.name}>
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
