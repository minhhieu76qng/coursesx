import React, { useMemo, useCallback } from 'react';
import moment from 'moment';
import { isString, isEmpty } from 'lodash';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Image } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import Text from 'components/Text';
import Rating from 'components/Rating';
import LogoLoadingIndicator from 'components/LogoLoadingIndicator';
import styles from './styles';
import ContextMenu from '../ContextMenu';

const CourseListItem = ({ course, onPress }) => {
  const { colors } = useTheme();

  const onBookmarkPress = useCallback(() => {}, []);

  const onDownloadPress = useCallback(() => {}, []);
  const { t } = useTranslation('course_detail');

  const courseOptions = useMemo(() => {
    return [
      {
        name: t('like_course'),
        onPress: onBookmarkPress,
      },
      {
        name: t('download_course'),
        onPress: onDownloadPress,
      },
    ];
  }, []);

  const courseData = course;

  const {
    title = '',
    'instructor.user.name': authorName,
    imageUrl,
    updatedAt,
    totalHours: duration = '',
    formalityPoint,
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
          {!isEmpty(authorName) && (
            <Text style={styles.description} type="subbody-light">
              {authorName}
            </Text>
          )}
          {!isEmpty(courseData?.publishDate) && (
            <Text style={styles.description} type="subbody-light">
              {`${courseData?.publishDate} - ${duration}`}
            </Text>
          )}
        </View>
        <Rating style={{ marginTop: 10 }} ratedStars={formalityPoint} />

        <ContextMenu options={courseOptions} />
      </View>
    </TouchableOpacity>
  );
};

export default CourseListItem;
