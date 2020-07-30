import React, { useMemo, useEffect, useState, useContext } from 'react';
import YoutubePlayer, { getYoutubeMeta } from 'react-native-youtube-iframe';
import { useTheme } from '@react-navigation/native';
import { Video as ExpoVideo } from 'expo-av';
import { View } from 'react-native';
import Icon from 'themes/Icon';
import Text from 'components/Text';
import { VIDEO_TYPE } from '../../constants';
import styles from './styles';

const VideoPlayerContext = React.createContext({
  isLoading: false,
  setLoading: () => {},
  setHeight: () => {},
  videoUrl: null,
  playingLesson: null,
  height: null,
  isYoutubeVideo: true,
});

const WrongVideoUI = () => {
  const { isYoutubeVideo } = useContext(VideoPlayerContext);
  const iconName = useMemo(() => (isYoutubeVideo ? 'youtube' : 'film'), [isYoutubeVideo]);
  return (
    <View style={styles.otherComps}>
      <Icon name={iconName} size={50} />
      <Text style={{ marginTop: 20 }}>Video link is wrong. Please contact admin to resolve!</Text>
    </View>
  );
};

const LoadingSkeleton = () => {
  const { isYoutubeVideo } = useContext(VideoPlayerContext);
  const iconName = useMemo(() => (isYoutubeVideo ? 'youtube' : 'film'), [isYoutubeVideo]);
  return (
    <View style={styles.otherComps}>
      <Icon name={iconName} size={50} />
    </View>
  );
};

const ExpoVideoPlayer = () => {
  const { videoUrl } = useContext(VideoPlayerContext);
  return <ExpoVideo source={{ uri: videoUrl }} />;
};

const YoutubeVideoPlayer = () => {
  const { videoUrl, setHeight, height, setLoading, isLoading } = useContext(VideoPlayerContext);
  const videoId = useMemo(() => {
    const paths = videoUrl?.split('/');
    return paths?.[paths.findIndex((p) => p === 'embed') + 1];
  }, [videoUrl]);

  useEffect(() => {
    setLoading(true);
    getYoutubeMeta(videoId)
      .then((meta = {}) => {
        if (meta.height) {
          setHeight(meta.height);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [videoId]);

  return isLoading ? <LoadingSkeleton /> : <YoutubePlayer videoId={videoId} height={height} />;
};

const VideoPlayer = ({ courseData, playingLesson }) => {
  const [isLoading, setLoading] = useState(true);
  const [height, setHeight] = useState(250);
  const { colors } = useTheme();

  const isYoutubeVideo = useMemo(() => courseData?.typeUploadVideoLesson === VIDEO_TYPE.YOUTUBE, [
    courseData,
  ]);

  return (
    <VideoPlayerContext.Provider
      value={{
        isLoading,
        setLoading,
        videoUrl: playingLesson?.videoUrl,
        height,
        setHeight,
        isYoutubeVideo,
      }}
    >
      <View style={[styles.container, { height, backgroundColor: colors.card }]}>
        {!playingLesson?.videoUrl && <WrongVideoUI />}
        {playingLesson?.videoUrl && (isYoutubeVideo ? <YoutubeVideoPlayer /> : <ExpoVideoPlayer />)}
      </View>
    </VideoPlayerContext.Provider>
  );
};

export default VideoPlayer;
