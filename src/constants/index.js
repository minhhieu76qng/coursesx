import screenName from './screenName';
import themeMode from './themeMode';

export { screenName, themeMode };

export const MAX_CARD_WIDTH = 250;

export const CATEGORY_TYPES = {
  NEWEST: 'NEWEST',
  RECOMMEND: 'RECOMMEND',
  ORIGIN: 'ORIGIN',
};

export const VIDEO_TYPE = {
  UPLOAD: 1,
  YOUTUBE: 2,
};

export const YOUTUBE_VIDEO_STAGE = {
  PLAYING: 'playing',
  PAUSED: 'paused',
  ENDED: 'ended',
};

export const SEARCH_TAB = {
  ALL: 'all',
  COURSES: 'courses',
  INSTRUCTORS: 'instructors',
};

export const SETTINGS_ID = {
  PROFILE: 'PROFILE',
  THEME: 'THEME',
  LANGUAGE: 'LANGUAGE',
  ABOUT: 'ABOUT',
  LOGOUT: 'LOGOUT',
};

export const LANGUAGE_ID = {
  VI: 'vi',
  EN: 'en',
};

export const SEARCH_LIMIT = 10;

export const UNAUTHORIZED = 401;

export const BASE_URL = 'https://api.itedu.me';
