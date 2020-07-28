import YouTubeVideoPlayer from 'react-native-youtube-iframe';
import { Video } from 'expo-av';
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
  getComponent(type) {
    switch (type) {
      case this.UPLOAD:
        return Video;
      case this.YOUTUBE:
        return YouTubeVideoPlayer;
      default:
        return null;
    }
  },
};
