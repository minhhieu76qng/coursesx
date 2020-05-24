import Home from 'screens/AppHome/Home';
import Downloads from 'screens/AppHome/Downloads';
import routesName from 'constants/routesName';

export default {
  home: {
    name: routesName.home,
    component: Home,
    initialParams: {
      backBtnVisibility: false,
    },
  },
  downloads: {
    name: routesName.downloads,
    component: Downloads,
    initialParams: {
      backBtnVisibility: false,
    },
  },
  browse: {
    name: routesName.browse,
    component: Downloads,
    initialParams: {
      backBtnVisibility: false,
    },
  },
  search: {
    name: routesName.search,
    component: Downloads,
    initialParams: {
      backBtnVisibility: false,
    },
  },
};
