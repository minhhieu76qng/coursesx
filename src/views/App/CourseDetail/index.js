import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { View, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { useRoute, useTheme } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import moment from 'moment';
import { Image } from 'react-native-elements';
import { useSelector } from 'react-redux';
import AppLayout from 'layouts/AppLayout';
import Text from 'components/Text';
import LogoLoadingIndicator from 'components/LogoLoadingIndicator';
import Badge from 'components/Badge';
import Avatar from 'components/Avatar';
import IconButton from 'components/IconButton';

import styles from './styles';
import CourseDetailContent from '../../../components/CourseDetailContent';
import CourseRepo from '../../../services/courses/repo';
import { getCurrentUser } from '../../../services/inapp/getters';
import CourseDetailContext from './CourseDetailContext';

const CourseDetailTab = createMaterialTopTabNavigator();
const videoHeight = Dimensions.get('window').height * 0.3 || 100;

const CourseDetail = () => {
  const route = useRoute();
  const currentUser = useSelector(getCurrentUser);
  const courseId = useMemo(() => route.params?.courseId, [route]);
  const [isLoading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState(null);
  const { colors } = useTheme();

  const onAuthorPress = useCallback(() => {
    // navigate to author
  }, []);

  useEffect(() => {
    setLoading(true);
    // get course info
    // get author
    // get subscription
    async function fetchCourse() {
      try {
        const course = await CourseRepo.getCourseDetail(courseId, currentUser?.id);
        if (course) {
          course.publishDate = moment(new Date(course.createdAt)).format('DD/MM/YYYY');
          const [author] = await Promise.all([CourseRepo.getSingleAuthor(course.instructorId)]);
          course.author = author;
          console.log('fetchCourse -> course', course);
          setCourseData(course);
        }
      } catch (e) {
        console.log('fetchCourse -> e', e);
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [setLoading, setCourseData]);

  return (
    <AppLayout>
      <CourseDetailContext.Provider value={{ courseData }}>
        <View style={[{ flex: 1 }, isLoading && styles.loadingContainer]}>
          {isLoading && <ActivityIndicator size="large" color={colors.primary} />}
          {!isLoading && courseData && (
            <>
              <View>
                <Image
                  style={{ width: '100%', height: videoHeight }}
                  source={{
                    uri: courseData.imageUrl,
                  }}
                  PlaceholderContent={
                    <LogoLoadingIndicator logoWidth={130} indicatorSize="large" />
                  }
                />
              </View>
              <ScrollView contentContainerStyle={styles.courseBody}>
                <Text type="h3" weight="medium" numberOfLines={2} style={styles.courseTitle}>
                  {courseData.title}
                </Text>
                {courseData?.author && (
                  <View style={styles.section}>
                    <Badge
                      wrapperStyle={styles.authorBadge}
                      onPress={() => onAuthorPress(courseData?.author?.id)}
                    >
                      <Avatar
                        avatarSize={20}
                        userAvatar={courseData?.author?.avatar}
                        containerStyle={styles.authorAvatar}
                      />
                      <Text type="subbody-light" color="#fff" numberOfLines={1}>
                        {courseData?.author?.name}
                      </Text>
                    </Badge>
                  </View>
                )}
                <View style={styles.section}>
                  <Text style={{ marginTop: 5 }} type="body">
                    {`${courseData.publishDate} - ${courseData.totalHours} h`}
                  </Text>
                </View>
                <View style={[styles.section, styles.iconsWrapper]}>
                  <View style={styles.iconContainer}>
                    <IconButton size={25} roundWidth={25} name="bookmark-o" />
                    <Text style={styles.iconText} type="subbody" weight="medium">
                      Đánh dấu
                    </Text>
                  </View>

                  <View style={styles.iconContainer}>
                    <IconButton size={25} roundWidth={25} name="arrow-circle-o-down" />
                    <Text style={styles.iconText} type="subbody" weight="medium">
                      Tải về
                    </Text>
                  </View>
                </View>
                <Text>Mô tả:</Text>
                <Text style={styles.description} type="subbody">
                  {courseData?.description}
                </Text>
                <CourseDetailTab.Navigator style={{ marginTop: 15 }}>
                  <CourseDetailTab.Screen name="Contents" component={CourseDetailContent} />
                  <CourseDetailTab.Screen name="Transcript" component={View} />
                </CourseDetailTab.Navigator>
              </ScrollView>
            </>
          )}
        </View>
      </CourseDetailContext.Provider>
    </AppLayout>
  );
};

export default CourseDetail;
