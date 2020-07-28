import React, { useMemo, useCallback } from 'react';
import moment from 'moment';
import { isString, isEmpty } from 'lodash';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Image } from 'react-native-elements';
import Text from 'components/Text';
import LogoLoadingIndicator from 'components/LogoLoadingIndicator';
import styles from './styles';
import ContextMenu from '../ContextMenu';

const CourseListItem = ({ course, onPress }) => {
  const { colors } = useTheme();

  const onBookmarkPress = useCallback(() => {}, []);

  const onDownloadPress = useCallback(() => {}, []);

  const courseOptions = useMemo(() => {
    return [
      {
        name: 'Đánh dấu',
        onPress: onBookmarkPress,
      },
      {
        name: 'Tải xuống',
        onPress: onDownloadPress,
      },
    ];
  }, []);

  const courseData = course;

  const {
    title = '',
    'instructor.user.name': author,
    imageUrl,
    updatedAt,
    totalHours: duration = '',
    // ratingPercent = 0,
    // ratingCount = 0,
  } = courseData;

  courseData.publishDate = moment(new Date(updatedAt)).format('DD/MM/YYYY');
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={onPress}
    >
      <View style={styles.leftBox}>
        {isString(imageUrl) && !isEmpty(imageUrl) && (
          <Image
            style={styles.courseImage}
            source={{ uri: imageUrl }}
            PlaceholderContent={<LogoLoadingIndicator logoWidth={150} indicatorSize="large" />}
          />
        )}
      </View>
      <View style={styles.rightBox}>
        <Text type="h4" numberOfLines={2}>
          {title}
        </Text>
        <View style={styles.descriptionWrapper}>
          {!isEmpty(author) && (
            <Text style={styles.description} type="subbody-light">
              {author}
            </Text>
          )}
          {!isEmpty(courseData?.publishDate) && (
            <Text style={styles.description} type="subbody-light">
              {`${courseData?.publishDate} - ${duration}`}
            </Text>
          )}
        </View>
        {/* <View style={styles.rattingWrapper}>
          
          
        </View> */}

        <ContextMenu options={courseOptions} />
      </View>
    </TouchableOpacity>
  );
};

export default CourseListItem;
