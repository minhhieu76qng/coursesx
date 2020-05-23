import Home from 'screens/AppHome/Home';
import Downloads from 'screens/AppHome/Downloads';
import routesName from 'constants/routesName';

export default {
  home: {
    name: routesName.home,
    component: Home,
  },
  downloads: {
    name: routesName.downloads,
    component: Downloads,
  },
  browse: {
    name: routesName.browse,
    component: Downloads,
  },
  search: {
    name: routesName.search,
    component: Downloads,
  },
};
