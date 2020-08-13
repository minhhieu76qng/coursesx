import React, { useState, useCallback, useEffect } from 'react';
import { ScrollView, View, ActivityIndicator, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme, useNavigation } from '@react-navigation/native';
import AppLayout from 'layouts/AppLayout';
import Section from 'components/Section';
import Rating from 'components/Rating';
import Card from 'components/Card';
import UserRepo from 'services/user/repo';
import { screenName } from 'constants';
import styles from './styles';
// import CourseRepo from '../../../services/courses/repo';

const Home = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [likedCourses, setLikedCourses] = useState([]);
  const [paidCourses, setPaidCourses] = useState([]);
  // const [coursesInFavourCategories, setFavourCourses] = useState([]);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const [likedCs, paidCs] = await Promise.all([
        UserRepo.getFavoriteCourses(),
        UserRepo.getProcessingCourses(),
      ]);
      console.log('loadData -> likedCs', likedCs);

      setLikedCourses(likedCs);
      setPaidCourses(paidCs);
      // eslint-disable-next-line no-empty
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });

    return unsubscribe;
  }, [navigation]);

  const onCoursePress = useCallback((courseId) => {
    navigation.navigate(screenName.courseDetail, { courseId });
  }, []);

  return (
    <AppLayout>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {/* paid courses */}
          <Section sectionTitle={t('paid_courses_title')}>
            <FlatList
              contentContainerStyle={{ padding: 5 }}
              data={paidCourses}
              keyExtractor={(path) => `${path.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Card
                  cardTitle={item.courseTitle}
                  cardDescriptions={[
                    `${item.instructorName} - ${
                      !item.coursePrice
                        ? `Miễn phí`
                        : `${new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          }).format(item.price)}`
                    }`,
                    // item.description,
                  ]}
                  cardImage={item.courseImage}
                  onPress={() => onCoursePress(item.id)}
                >
                  <Rating style={{ marginTop: 10 }} ratedStars={item.courseFormalityPoint} />
                </Card>
              )}
            />
          </Section>
          {/* like courses */}
          <Section sectionTitle={t('liked_courses_title')}>
            <FlatList
              contentContainerStyle={{ padding: 5 }}
              data={likedCourses}
              keyExtractor={(path) => `${path.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Card
                  cardTitle={item.courseTitle}
                  cardDescriptions={[
                    `${item.instructorName} - ${
                      !item.coursePrice
                        ? `Miễn phí`
                        : `${new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          }).format(item.price)}`
                    }`,
                    // item.description,
                  ]}
                  cardImage={item.courseImage}
                  onPress={() => onCoursePress(item.id)}
                >
                  <Rating style={{ marginTop: 10 }} ratedStars={item.courseFormalityPoint} />
                </Card>
              )}
            />
          </Section>

          {/* favorite categories */}
          {/* <Section sectionTitle={t('course_in_liked_categories')}></Section> */}
        </ScrollView>
      )}
    </AppLayout>
  );
};

export default Home;
