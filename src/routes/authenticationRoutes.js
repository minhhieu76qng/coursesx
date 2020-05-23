import Login from 'screens/Authentication/Login';
import Register from 'screens/Authentication/Register';
import ForgotPassword from 'screens/Authentication/ForgotPassword';
import Splash from 'screens/Splash';
import routesName from 'constants/routesName';

export default {
  splash: {
    name: routesName.splash,
    component: Splash,
    options: {
      headerShown: false,
    },
  },
  login: {
    name: routesName.login,
    component: Login,
    options: {
      headerShown: false,
    },
  },
  register: {
    name: routesName.register,
    component: Register,
    options: {
      headerShown: false,
    },
  },
  forgotPassword: {
    name: routesName.forgotPassword,
    component: ForgotPassword,
    options: {
      headerShown: false,
    },
  },
  verifyAccount: {
    name: routesName.verifyAccount,
    component: ForgotPassword,
    options: {
      headerShown: false,
    },
  },
};
