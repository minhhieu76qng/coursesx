import React, { useMemo } from 'react';
import Icon from 'themes/Icon';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import screenName from 'constants/screenName';
import Home from 'views/App/Home';
import Downloads from 'views/App/Downloads';
import Browse from 'views/App/Browse';
import CourseDetail from 'views/App/CourseDetail';
import CoursesInSection from 'views/App/CoursesInSection';
import Text from 'components/Text';
// import Search from 'views/App/Search';

const AppTab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    let iconName;

    switch (route.name) {
      case screenName.home:
        iconName = 'home';
        break;
      case screenName.downloads:
        iconName = 'cloud-download';
        break;
      case screenName.browse:
        iconName = 'list';
        break;
      case screenName.search:
        iconName = 'search';
        break;
      default:
        iconName = '';
    }

    return <Icon name={iconName} size={size} color={color} />;
  },
  tabBarLabel: ({ color }) => {
    const { t } = useTranslation('tab_navigator');
    let tabName;
    switch (route.name) {
      case screenName.home:
        tabName = t('home');
        break;
      case screenName.downloads:
        tabName = t('download');
        break;
      case screenName.browse:
        tabName = t('browse');
        break;
      case screenName.search:
        tabName = t('search');
        break;
      default:
        tabName = '';
    }
    return (
      <Text type="description" color={color}>
        {tabName}
      </Text>
    );
  },
});

const Stack = createStackNavigator();

const CourseDetailScreen = (
  <Stack.Screen
    name={screenName.courseDetail}
    component={CourseDetail}
    options={{
      headerShown: false,
    }}
    initialParams={{
      header: {
        backBtnVisibility: true,
        headerTitle: 'Course detail',
        headerShown: true,
      },
    }}
  />
);

const CoursesInSectionScreen = (
  <Stack.Screen
    name={screenName.coursesInSection}
    component={CoursesInSection}
    options={{
      headerShown: false,
    }}
    initialParams={{
      header: {
        backBtnVisibility: true,
        headerTitle: '',
        headerShown: true,
      },
    }}
  />
);

const HomeStackComp = () => {
  return (
    <Stack.Navigator initialRouteName={screenName.home} mode="modal">
      {CourseDetailScreen}
      {CoursesInSectionScreen}
      <Stack.Screen
        name={screenName.home}
        component={Home}
        options={{
          headerShown: false,
        }}
        initialParams={{
          header: {
            backBtnVisibility: false,
            headerTitle: 'Home',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const DownloadsStackComp = () => {
  return (
    <Stack.Navigator initialRouteName={screenName.downloads} mode="modal">
      {CourseDetailScreen}
      {CoursesInSectionScreen}
      <Stack.Screen
        name={screenName.downloads}
        component={Downloads}
        options={{
          headerShown: false,
        }}
        initialParams={{
          header: {
            backBtnVisibility: false,
            headerTitle: 'Downloads',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const BrowseStackComp = () => {
  return (
    <Stack.Navigator initialRouteName={screenName.browse} mode="modal">
      {CourseDetailScreen}
      {CoursesInSectionScreen}
      <Stack.Screen
        name={screenName.browse}
        component={Browse}
        options={{
          headerShown: false,
        }}
        initialParams={{
          header: {
            backBtnVisibility: false,
            headerTitle: 'Browse',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const SearchStackComp = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={screenName.search}
      mode="modal"
    >
      {CourseDetailScreen}
      {CoursesInSectionScreen}
      <Stack.Screen
        name={screenName.search}
        component={Downloads}
        options={{
          headerShown: false,
        }}
        initialParams={{
          header: {
            backBtnVisibility: false,
            headerTitle: 'Search',
            headerShown: false,
          },
        }}
      />
    </Stack.Navigator>
  );
};

const MainTab = () => {
  const { colors } = useTheme();
  const tabBarOptions = useMemo(() => {
    return {
      inactiveTintColor: colors.tabBarIcon_Inactive,
      style: { backgroundColor: colors.tabBar, paddingTop: 10 },
    };
  }, [colors]);

  return (
    <AppTab.Navigator
      screenOptions={screenOptions}
      tabBarOptions={{
        ...tabBarOptions,
        labelStyle: {
          fontFamily: 'Quicksand-Medium',
        },
      }}
    >
      <AppTab.Screen name={screenName.home} component={HomeStackComp} />
      <AppTab.Screen name={screenName.downloads} component={DownloadsStackComp} />
      <AppTab.Screen name={screenName.browse} component={BrowseStackComp} />
      <AppTab.Screen name={screenName.search} component={SearchStackComp} />
    </AppTab.Navigator>
  );
};

export default MainTab;
