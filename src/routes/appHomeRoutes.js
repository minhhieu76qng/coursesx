import Home from 'screens/AppHome/Home';
import Downloads from 'screens/AppHome/Downloads';
import Browse from 'screens/AppHome/Browse';
import routesName from 'constants/routesName';

export default {
  home: {
    name: routesName.home,
    component: Home,
    initialParams: {
      header: {
        backBtnVisibility: false,
        headerTitle: 'Home',
      },
    },
  },
  downloads: {
    name: routesName.downloads,
    component: Downloads,
    initialParams: {
      header: {
        backBtnVisibility: false,
        headerTitle: 'Downloads',
      },
    },
  },
  browse: {
    name: routesName.browse,
    component: Browse,
    initialParams: {
      header: {
        backBtnVisibility: false,
        headerTitle: 'Browse',
      },
    },
  },
  search: {
    name: routesName.search,
    component: Downloads,
    initialParams: {
      header: {
        backBtnVisibility: false,
        headerTitle: 'Search',
      },
    },
  },
};
