import React, { useMemo, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Image } from 'react-native-elements';
import Text from 'components/Text';
import LogoLoadingIndicator from 'components/LogoLoadingIndicator';
import styles from './styles';
import ContextMenu from '../ContextMenu';

const CourseListItem = ({ courseData, onPress }) => {
  const { colors } = useTheme();

  const onBookmarkPress = useCallback(() => {}, []);

  const onDownloadPress = useCallback(() => {}, []);

  const courseOptions = useMemo(() => {
    return [
      {
        name: 'Bookmark',
        onPress: onBookmarkPress,
      },
      {
        name: 'Download',
        onPress: onDownloadPress,
      },
    ];
  }, []);

  const {
    courseName = '',
    author = '',
    courseImage = '',
    level = '',
    publishDate = '',
    duration = '',
    // ratingPercent = 0,
    // ratingCount = 0,
  } = courseData;
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={onPress}
    >
      <View style={styles.leftBox}>
        <Image
          style={styles.courseImage}
          source={{ uri: courseImage }}
          PlaceholderContent={<LogoLoadingIndicator logoWidth={150} indicatorSize="large" />}
        />
      </View>
      <View style={styles.rightBox}>
        <Text type="h4">{courseName}</Text>
        <View style={styles.descriptionWrapper}>
          <Text type="subbody-light">{author}</Text>
          <Text type="subbody-light">{`${level} - ${publishDate} - ${duration}`}</Text>
        </View>
        {/* <View style={styles.rattingWrapper}>
          <Rating
            imageSize={20}
            fractions={1}
            startingValue={ratingPercent / 100}
            // ratingBackgroundColor='red'
            type='custom'
            style={styles.rating}
          />
          <Text>({ratingCount})</Text>
        </View> */}

        <ContextMenu options={courseOptions} />
      </View>
    </TouchableOpacity>
  );
};

export default CourseListItem;
