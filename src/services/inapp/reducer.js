import themeMode from 'constants/themeMode';
import {
  SET_THEME,
  SET_CURRENT_USER,
  SHOW_FLASH_MESSAGE,
  REMOVE_FLASH_MESSAGE,
  UPDATE_CATEGORIES,
} from './constants';

const initialMessageState = { type: null, message: null, description: null };

const initialState = {
  themeMode: themeMode.light,
  currentUser: null,
  flashMessage: initialMessageState,
  categories: [],
};

function inApp(state = initialState, action) {
  switch (action.type) {
    case SET_THEME:
      return { ...state, themeMode: action.payload.themeMode };
    case SET_CURRENT_USER:
      return { ...state, currentUser: action.payload.currentUser };
    case SHOW_FLASH_MESSAGE:
      return { ...state, flashMessage: action.payload };
    case REMOVE_FLASH_MESSAGE:
      return { ...state, flashMessage: initialMessageState };
    case UPDATE_CATEGORIES:
      return { ...state, categories: action.payload.categories };
    default:
      return state;
  }
}

export default inApp;
