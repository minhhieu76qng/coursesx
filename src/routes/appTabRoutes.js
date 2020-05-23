import routesName from 'constants/routesName';
import AppHome from 'navigation/AppHome';

function getHeaderTitle(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'Home';

  switch (routeName) {
    case 'Home':
      return 'Home';
    case 'Downloads':
      return 'Downloads';
    case 'Browse':
      return 'Browse';
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
