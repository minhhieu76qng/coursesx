import React from 'react';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Dark, Light } from 'themes/MyTheme';

import routes from './routes';

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
        <Stack.Navigator initialRouteName={routes.login.name}>
          <Stack.Screen
            name={routes.login.name}
            component={routes.login.component}
            options={routes.login.options}
          />
          <Stack.Screen
            name={routes.register.name}
            component={routes.register.component}
            options={routes.register.options}
          />
          <Stack.Screen
            name={routes.forgotPassword.name}
            component={routes.forgotPassword.component}
            options={routes.forgotPassword.options}
          />
          <Stack.Screen
            name={routes.verifyAccount.name}
            component={routes.verifyAccount.component}
            options={routes.verifyAccount.options}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
};

export default AppNavigator;
