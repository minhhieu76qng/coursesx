import themeMode from 'constants/themeMode';
import { SET_THEME, SET_CURRENT_USER } from './constants';

const initialState = {
  themeMode: themeMode.dark,
  currentUser: null,
};

function inApp(state = initialState, action) {
  switch (action.type) {
    case SET_THEME:
      return { ...state, themeMode: action.payload.themeMode };
    case SET_CURRENT_USER:
      return { ...state, currentUser: action.payload.currentUser };
    default:
      return state;
  }
}

export default inApp;
