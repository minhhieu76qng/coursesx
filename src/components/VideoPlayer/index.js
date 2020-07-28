import React, { useMemo } from 'react';
import { View } from 'react-native';
import Text from 'components/Text';
import { VIDEO_TYPE } from '../../constants';
import styles from './styles';

const WrongVideoUI = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bài học bị lỗi.</Text>
    </View>
  );
};

const VideoPlayer = ({ courseData, playingLesson, height = 300 }) => {
  const VideoComponent = useMemo(() => {
    const Video = VIDEO_TYPE.getComponent(courseData?.typeUploadVideoLesson);
    let player = <WrongVideoUI />;
    const videoUrl = playingLesson?.videoUrl;
    if (!videoUrl) {
      return player;
    }
    let videoId = null;
    let paths = [];
    switch (courseData?.typeUploadVideoLesson) {
      case VIDEO_TYPE.UPLOAD:
        player = <Video style={styles.container} />;
        break;
      case VIDEO_TYPE.YOUTUBE:
        // get videoId
        paths = videoUrl?.split('/');
        videoId = paths?.[paths.findIndex((p) => p === 'embed') + 1];
        player = <Video videoId={videoId} height={height} />;
        break;
      default:
    }
    return player;
  }, [courseData]);

  return VideoComponent;
};

export default VideoPlayer;
