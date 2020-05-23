import Login from 'screens/Authentication/Login';
import Register from 'screens/Authentication/Register';
import ForgotPassword from 'screens/Authentication/ForgotPassword';

export default {
  login: {
    name: 'Login',
    component: Login,
    options: {
      headerShown: false,
    },
  },
  register: {
    name: 'Register',
    component: Register,
    options: {
      headerShown: false,
    },
  },
  forgotPassword: {
    name: 'ForgotPassword',
    component: ForgotPassword,
    options: {
      headerShown: false,
    },
  },
  verifyAccount: {
    name: 'VerifyAccount',
    component: ForgotPassword,
    options: {
      headerShown: false,
    },
  },
};
