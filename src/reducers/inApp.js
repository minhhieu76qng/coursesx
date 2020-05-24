import themeMode from 'constants/themeMode';
import { SET_THEME } from 'actions/inApp';

const initialState = {
  themeMode: themeMode.dark,
};

function inApp(state = initialState, action) {
  switch (action.type) {
    case SET_THEME:
      return { ...state, themeMode: action.payload.themeMode };
    default:
      return state;
  }
}

export default inApp;
