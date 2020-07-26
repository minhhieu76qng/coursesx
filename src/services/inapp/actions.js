const { SET_CURRENT_USER } = require('./constants');

// eslint-disable-next-line import/prefer-default-export
export function setCurrentUser(currentUser = {}) {
  return {
    type: SET_CURRENT_USER,
    payload: currentUser,
  };
}
