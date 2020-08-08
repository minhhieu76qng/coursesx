import React, { useMemo, useEffect, useState, useContext, useCallback, useRef } from 'react';
import YoutubePlayer, { getYoutubeMeta } from 'react-native-youtube-iframe';
import { useTheme } from '@react-navigation/native';
import { Video as ExpoVideo } from 'expo-av';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Icon from 'themes/Icon';
import Text from 'components/Text';
import { VIDEO_TYPE, YOUTUBE_VIDEO_STAGE } from '../../constants';
import styles from './styles';

const VideoPlayerContext = React.createContext({
  isLoading: false,
  setLoading: () => {},
  setHeight: () => {},
  videoUrl: null,
  playingLesson: null,
  height: null,
  isYoutubeVideo: true,
  autoPlay: true,
});

const VideoMessage = ({ text = '' }) => {
  const { isYoutubeVideo } = useContext(VideoPlayerContext);
  const iconName = useMemo(() => (isYoutubeVideo ? 'youtube' : 'film'), [isYoutubeVideo]);
  return (
    <View style={styles.otherComps}>
      <Icon name={iconName} size={50} />
      <Text style={{ marginTop: 20, textAlign: 'center', lineHeight: 22 }}>{text}</Text>
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
  const { videoUrl, height } = useContext(VideoPlayerContext);

  return (
    <ExpoVideo
      progressUpdateIntervalMillis={500}
      shouldPlay
      rate={1.0}
      volume={1.0}
      isMuted={false}
      isLooping={false}
      source={{ uri: videoUrl }}
      useNativeControls
      style={{
        width: '100%',
        height,
      }}
    />
  );
};

const YoutubeVideoPlayer = ({ onStopVideo, onVideoEnded }) => {
  const {
    videoUrl,
    setHeight,
    height,
    setLoading,
    isLoading,
    currentVideoTime,
    autoPlay,
  } = useContext(VideoPlayerContext);
  const videoRef = useRef(null);
  const videoId = useMemo(() => {
    const paths = videoUrl?.split('/');
    return paths?.[paths.findIndex((p) => p === 'embed') + 1];
  }, [videoUrl]);

  const onVideoPlayerStageChanged = useCallback(async (event) => {
    if (event === YOUTUBE_VIDEO_STAGE.ENDED) {
      await onVideoEnded();
    }
    if (event === YOUTUBE_VIDEO_STAGE.PAUSED) {
      const time = await videoRef.current?.getCurrentTime();
      await onStopVideo(time);
    }
  }, []);

  const onVideoReady = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.seekTo(currentVideoTime);
    }
  }, [currentVideoTime]);

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

  return isLoading ? (
    <LoadingSkeleton />
  ) : (
    <YoutubePlayer
      ref={videoRef}
      play={autoPlay}
      onChangeState={onVideoPlayerStageChanged}
      onReady={onVideoReady}
      videoId={videoId}
      height={height}
    />
  );
};

const VideoPlayer = ({
  courseData,
  playingLesson,
  autoPlay = true,
  onStopVideo = () => {},
  onVideoEnded = () => {},
}) => {
  const [isLoading, setLoading] = useState(true);
  const [height, setHeight] = useState(250);
  const { colors } = useTheme();
  const { t } = useTranslation('error');

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
        currentVideoTime: playingLesson?.currentTime || 0,
        autoPlay,
      }}
    >
      <View style={[styles.container, { height, backgroundColor: colors.card }]}>
        {!courseData.isBought && <VideoMessage text={t('not_buy_course')} />}
        {courseData.isBought && (
          <>
            {!playingLesson?.videoUrl && <VideoMessage text={t('wrong_video_url')} />}
            {playingLesson?.videoUrl &&
              (isYoutubeVideo ? (
                <YoutubeVideoPlayer onStopVideo={onStopVideo} onVideoEnded={onVideoEnded} />
              ) : (
                <ExpoVideoPlayer />
              ))}
          </>
        )}
      </View>
    </VideoPlayerContext.Provider>
  );
};

export default VideoPlayer;
