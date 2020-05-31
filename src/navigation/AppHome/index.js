import React, { useMemo } from 'react';
import Icon from 'themes/Icon';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import routesName from 'constants/routesName';
import appHomeRoutes from 'routes/appHomeRoutes';
import { useTheme } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    let iconName;

    switch (route.name) {
      case routesName.home:
        iconName = 'home';
        break;
      case routesName.downloads:
        iconName = 'arrow-circle-o-down';
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
  const { colors } = useTheme();
  const tabBarOptions = useMemo(() => {
    return {
      inactiveTintColor: colors.tabBarIcon_Inactive,
      style: { backgroundColor: colors.tabBar, paddingTop: 10 },
    };
  }, [colors]);

  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      tabBarOptions={{
        ...tabBarOptions,
        labelStyle: {
          fontFamily: 'Quicksand-Medium',
        },
      }}
    >
      <Tab.Screen
        name={appHomeRoutes.home.name}
        component={appHomeRoutes.home.component}
        options={appHomeRoutes.home.options}
        initialParams={appHomeRoutes.home.initialParams}
      />
      <Tab.Screen
        name={appHomeRoutes.downloads.name}
        component={appHomeRoutes.downloads.component}
        options={appHomeRoutes.downloads.options}
        initialParams={appHomeRoutes.downloads.initialParams}
      />
      <Tab.Screen
        name={appHomeRoutes.browse.name}
        component={appHomeRoutes.browse.component}
        options={appHomeRoutes.browse.options}
        initialParams={appHomeRoutes.browse.initialParams}
      />
      <Tab.Screen
        name={appHomeRoutes.search.name}
        component={appHomeRoutes.search.component}
        options={appHomeRoutes.search.options}
        initialParams={appHomeRoutes.search.initialParams}
      />
    </Tab.Navigator>
  );
};

export default AppHome;
