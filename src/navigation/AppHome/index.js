import React, { useMemo } from 'react';
import Icon from 'themes/Icon';
import { useColorScheme } from 'react-native-appearance';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import routesName from 'constants/routesName';
import appHomeRoutes from 'routes/appHomeRoutes';
import { Dark, Light } from 'themes/MyTheme';

const Tab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    let iconName;

    switch (route.name) {
      case routesName.home:
        iconName = 'home';
        break;
      case routesName.downloads:
        iconName = 'download';
        break;
      case routesName.browse:
        iconName = 'list';
        break;
      case routesName.search:
        iconName = 'search';
        break;
      default:
        iconName = '';
    }

    return <Icon name={iconName} size={size} color={color} />;
  },
});

const AppHome = () => {
  const scheme = useColorScheme();
  const tabBarOptions = useMemo(() => {
    const colors = scheme === 'dark' ? Dark : Light;
    return {
      inactiveTintColor: colors.tabBarIcon_Inactive,
      style: { backgroundColor: colors.tabBar, paddingTop: 10 },
    };
  }, [scheme, Dark, Light]);

  return (
    <Tab.Navigator screenOptions={screenOptions} tabBarOptions={tabBarOptions}>
      <Tab.Screen
        name={appHomeRoutes.home.name}
        component={appHomeRoutes.home.component}
        options={appHomeRoutes.home.options}
      />
      <Tab.Screen
        name={appHomeRoutes.downloads.name}
        component={appHomeRoutes.downloads.component}
        options={appHomeRoutes.downloads.options}
      />
      <Tab.Screen
        name={appHomeRoutes.browse.name}
        component={appHomeRoutes.browse.component}
        options={appHomeRoutes.browse.options}
      />
      <Tab.Screen
        name={appHomeRoutes.search.name}
        component={appHomeRoutes.search.component}
        options={appHomeRoutes.search.options}
      />
    </Tab.Navigator>
  );
};

export default AppHome;
