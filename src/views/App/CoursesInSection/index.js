import React, { useMemo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FlatList, View, ActivityIndicator } from 'react-native';
import { useTheme, useRoute } from '@react-navigation/native';
import AppLayout from 'layouts/AppLayout';
import styles from './styles';
import { CATEGORY_TYPES } from '../../../constants';
import CourseRepo from '../../../services/courses/repo';
import { getCurrentUser } from '../../../services/inapp/getters';
import CourseListItem from '../../../components/CourseListItem';

const CoursesInSection = () => {
  const route = useRoute();
  const currentUser = useSelector(getCurrentUser);
  const [courseList, setCourseList] = useState([]);
  const { colors } = useTheme();
  const categoryData = useMemo(() => {
    const category = route?.params?.['category'] || {};
    const categoryType = route?.params?.['type'];
    return {
      type: categoryType,
      ...category,
    };
  }, [route]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    switch (categoryData.type) {
      case CATEGORY_TYPES.NEWEST:
        CourseRepo.getLatestCourse()
          .then((data) => setCourseList(data))
          .catch((error) => console.log(error))
          .finally(() => setLoading(false));
        break;
      case CATEGORY_TYPES.RECOMMEND:
        CourseRepo.getRecommendCourses({ userId: currentUser?.id })
          .then((data) => setCourseList(data))
          .catch((error) => console.log(error))
          .finally(() => setLoading(false));
        break;
      case CATEGORY_TYPES.ORIGIN:
        CourseRepo.getLatestCourse()
          .then((data) => setCourseList(data))
          .catch((error) => console.log(error))
          .finally(() => setLoading(false));
        break;
      default:
    }
  }, [categoryData]);
  return (
    <AppLayout>
      <View
        style={[
          styles.container,
          isLoading && { flex: 1, justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <FlatList
            data={courseList}
            keyExtractor={(path) => `${path.id}`}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <CourseListItem course={item} />}
          />
        )}
      </View>
    </AppLayout>
  );
};

export default CoursesInSection;
