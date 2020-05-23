import Login from 'screens/Login';
import Register from 'screens/Register';

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
};
