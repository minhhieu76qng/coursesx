import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Dark, Light } from 'themes/MyTheme';
import { getThemeMode, getCurrentUser } from 'services/inapp/getters';
import { themeMode } from 'constants';
import screenName from 'constants/screenName';
import Splash from 'views/Splash';
import Login from 'views/Authentication/Login';
import ForgotPassword from 'views/Authentication/ForgotPassword';
import Register from 'views/Authentication/Register';
// import VerifyAccount from 'views/Authentication/VerifyAccount';
import MainTab from './MainTab';

const RootStack = createStackNavigator();

const customDark = {
  ...DarkTheme,
  ...Dark,
};

const customLight = {
  ...DefaultTheme,
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

  const currentUser = useSelector(getCurrentUser);

  return (
    <AppearanceProvider>
      <NavigationContainer theme={theme}>
        <RootStack.Navigator initialRouteName={screenName.splash}>
          {!currentUser && (
            <>
              <RootStack.Screen
                name={screenName.splash}
                component={Splash}
                options={{
                  headerShown: false,
                }}
              />
              <RootStack.Screen
                name={screenName.login}
                component={Login}
                options={{
                  headerShown: false,
                }}
              />
              <RootStack.Screen
                name={screenName.register}
                component={Register}
                options={{
                  headerShown: false,
                }}
              />
              <RootStack.Screen
                name={screenName.forgotPassword}
                component={ForgotPassword}
                options={{
                  headerShown: false,
                }}
              />
            </>
          )}
          {/* <RootStack.Screen
            name={screenName.verifyAccount}
            component={VerifyAccount}
            options={{
              headerShown: false,
            }}
          /> */}

          {currentUser && (
            <RootStack.Screen
              name={screenName.mainTab}
              component={MainTab}
              options={{
                headerShown: false,
              }}
            />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
};

export default AppNavigator;
