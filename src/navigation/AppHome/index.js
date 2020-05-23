import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import appHomeRoutes from 'routes/appHomeRoutes';

const Tab = createBottomTabNavigator();

const AppHome = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={appHomeRoutes.home.name}
        component={appHomeRoutes.home.component}
        options={appHomeRoutes.home.options}
      />
    </Tab.Navigator>
  );
};

export default AppHome;
