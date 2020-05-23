import routesName from 'constants/routesName';
import AppHome from 'navigation/AppHome';

function getHeaderTitle(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'Home';

  switch (routeName) {
    case routesName.home:
      return 'Home';
    case routesName.downloads:
      return 'Downloads';
    case routesName.browse:
      return 'Browse';
    case routesName.search:
      return 'Search';
    default:
      return '';
  }
}

export default {
  appHome: {
    name: routesName.appHome,
    component: AppHome,
    options: ({ route }) => ({
      headerTitle: getHeaderTitle(route),
    }),
  },
};
