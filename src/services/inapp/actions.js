import MessageType from './MessageType';
import { transformCategoriesWithImage } from '../../utils/helpers';

const {
  SET_CURRENT_USER,
  SHOW_FLASH_MESSAGE,
  REMOVE_FLASH_MESSAGE,
  UPDATE_CATEGORIES,
} = require('./constants');

// eslint-disable-next-line import/prefer-default-export
export function setCurrentUser(currentUser = {}) {
  return {
    type: SET_CURRENT_USER,
    payload: {
      currentUser,
    },
  };
}

export function showFlashMessage({ type = MessageType.Type.DANGER, description = '' }) {
  return {
    type: SHOW_FLASH_MESSAGE,
    payload: {
      type,
      message: MessageType.titleFromType(type),
      description,
    },
  };
}

export function removeFlashMessage() {
  return {
    type: REMOVE_FLASH_MESSAGE,
  };
}

export function updateCategories(categories) {
  return {
    type: UPDATE_CATEGORIES,
    payload: {
      categories: transformCategoriesWithImage(categories),
    },
  };
}
