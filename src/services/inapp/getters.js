// eslint-disable-next-line import/prefer-default-export
export const getThemeMode = (state) => {
  return state.inApp.themeMode;
};

export const getCurrentUser = (state) => {
  return state.inApp.currentUser;
};

export const getFlashMessage = (state) => state.inApp.flashMessage;

export const getCategories = (state) => state.inApp?.categories || [];
