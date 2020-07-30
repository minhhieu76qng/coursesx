import React, { useMemo, useEffect, useState, useContext } from 'react';
import YoutubePlayer, { getYoutubeMeta } from 'react-native-youtube-iframe';
// import { Video as ExpoVideo } from 'expo-av';
import { View } from 'react-native';
import Icon from 'themes/Icon';
import { VIDEO_TYPE } from '../../constants';

const VideoPlayerContext = React.createContext({
  isLoading: false,
  setLoading: () => {},
  setHeight: () => {},
  videoUrl: null,
  playingLesson: null,
  height: null,
  isYoutubeVideo: true,
});

// const WrongVideoUI = () => {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Bài học bị lỗi.</Text>
//     </View>
//   );
// };

const LoadingSkeleton = () => {
  const { isYoutubeVideo } = useContext(VideoPlayerContext);
  const iconName = useMemo(() => (isYoutubeVideo ? 'youtube' : 'film'), [isYoutubeVideo]);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Icon name={iconName} size={50} />
    </View>
  );
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
      {isYoutubeVideo ? <YoutubeVideoPlayer /> : null}
    </VideoPlayerContext.Provider>
  );
};

export default VideoPlayer;
