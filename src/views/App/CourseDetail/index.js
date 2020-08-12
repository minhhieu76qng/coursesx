import React from 'react';
import { View, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { NavigationContext, useTheme } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withTranslation } from 'react-i18next';
import moment from 'moment';
import { ThemeContext } from 'react-native-elements';
import { connect } from 'react-redux';
import AppLayout from 'layouts/AppLayout';
import Text from 'components/Text';
import Badge from 'components/Badge';
import Avatar from 'components/Avatar';
import Section from 'components/Section';
import Card from 'components/Card';
import IconButton from 'components/IconButton';
import { isArray } from 'lodash';
import * as Linking from 'expo-linking';

import styles from './styles';
import CourseDetailContent from '../../../components/CourseDetailContent';
import CourseRepo from '../../../services/courses/repo';
import { getCurrentUser } from '../../../services/inapp/getters';
import CourseDetailContext from './CourseDetailContext';
import VideoPlayer from '../../../components/VideoPlayer';
import UserRepo from '../../../services/user/repo';
import Rating from '../../../components/Rating';
import { showFlashMessage } from '../../../services/inapp/actions';
import MessageType from '../../../services/inapp/MessageType';
import AppModal from '../../../components/AppModal';

const CourseDetailTab = createMaterialTopTabNavigator();

class CourseDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      courseData: null,
      playingLesson: null,
      isLiked: false,
      isBought: false,
      feeModalVisible: false,
    };
  }

  componentDidMount() {
    this.fetchCourse();
  }

  onAuthorPress = () => {};

  onBuyCoursePress = async () => {
    const { courseData } = this.state;
    const { t, showFlashMsg } = this.props;

    if (!courseData) {
      return;
    }

    try {
      if (!courseData.price) {
        Linking.openURL(`https://itedu.me/payment/${courseData.id}`);
        this.setState({
          feeModalVisible: true,
        });
        return;
      }

      const courseLink = await CourseRepo.getFreeCourse(courseData.id);

      if (courseLink) {
        showFlashMsg({
          type: MessageType.Type.SUCCESS,
          description: t('buy_course_success'),
        });
        this.fetchCourse();
      }
    } catch (e) {
      showFlashMsg({
        type: MessageType.Type.DANGER,
        description: t('buy_course_fail'),
      });
    }
  };

  onLikeCoursePress = async () => {
    const { courseData } = this.state;
    const { t, showFlashMsg } = this.props;
    try {
      const isLiked = await UserRepo.likeCourse(courseData.id);

      if (isLiked) {
        showFlashMsg({
          type: MessageType.Type.SUCCESS,
          description: t('like_course_success'),
        });
        this.fetchCourse();
      }
    } catch (e) {
      showFlashMsg({
        type: MessageType.Type.DANGER,
        description: t('like_course_fail'),
      });
    }
  };

  onDownloadCoursePress = () => {};

  onByModalConfirm = () => {
    this.setState(
      {
        feeModalVisible: false,
      },
      () => {
        this.fetchCourse();
      },
    );
  };

  onStopVideo = async (currentTime) => {
    // call api to update current time
    const { playingLesson } = this.state;
    if (playingLesson?.id) {
      await CourseRepo.updateLearningTime({ lessonId: playingLesson.id, currentTime });
    }
  };

  onVideoEnded = async () => {
    const { playingLesson } = this.state;
    if (playingLesson?.nextLessonId) {
      await this.selectLesson(playingLesson?.nextLessonId);
    }

    if (playingLesson?.id && playingLesson?.isFinished) {
      await CourseRepo.updateFinishLesson(playingLesson.id);
    }
  };

  selectLesson = async (lessonId) => {
    try {
      const { courseData } = this.state;
      const courseId = courseData?.id || this.props?.route?.params?.courseId;
      if (!courseId) {
        return;
      }
      const lesson = await CourseRepo.getLesson(courseId, lessonId);
      console.log('CourseDetail -> selectLesson -> lesson', lesson);
      this.setState({
        playingLesson: lesson,
      });
    } catch (e) {
      console.log('CourseDetail -> getLesson -> e', e);
    }
  };

  // async getExercises(course) {
  //   const courseData = course || this.state?.courseData;
  //   const lessonIds = (courseData?.section || []).reduce((acc, s) => {
  //     let result = acc;
  //     result = [...acc, ...(s?.lesson || []).map((l) => l.id)];
  //     return result;
  //   }, []);

  //   const listExercises = await Promise.all(
  //     lessonIds.map((lessonId) => CourseRepo.getExercisesInLesson(lessonId)),
  //   ).then((data) =>
  //     (data || []).reduce((acc, o) => {
  //       let result = acc;
  //       result = [...result, ...o];
  //       return result;
  //     }, []),
  //   );

  //   console.log('CourseDetail -> getExercises -> listExercises', JSON.stringify(listExercises));
  // }

  onRelatedCoursePress = (courseId) => {
    console.log('CourseDetail -> onRelatedCoursePress -> courseId', courseId);
    // this.props.navigation.replace()
  };

  async fetchCourse() {
    try {
      this.setState({
        isLoading: true,
      });
      const { courseId } = this.props?.route?.params;
      const { currentUser } = this.props;
      const [course, isBought, isLiked] = await Promise.all([
        CourseRepo.getCourseDetail(courseId, currentUser?.id),
        UserRepo.isBoughtCourse(courseId),
        UserRepo.isLikedCourse(courseId),
      ]);

      if (course) {
        // this.getExercises(course);
        course.isBought = isBought;
        course.publishDate = moment(new Date(course.createdAt)).format('DD/MM/YYYY');
        const author = await CourseRepo.getSingleAuthor(course.instructorId);
        course.author = author;
        try {
          // mean you have not bought this course
          if (course.isBought) {
            const lastWatchedLesson = await CourseRepo.getLastWatchedLesson(courseId);
            if (lastWatchedLesson?.lessonId) {
              await this.selectLesson(lastWatchedLesson.lessonId);
            }
          }
        } catch (error) {
          // await this.selectLesson(course)
        }
        this.setState({
          courseData: course,
          isLiked,
          isBought,
        });
      }
    } catch (e) {
      console.log('fetchCourse -> e', e);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    const { isLoading, courseData, playingLesson, isBought, isLiked, feeModalVisible } = this.state;
    const {
      onAuthorPress,
      onStopVideo,
      onVideoEnded,
      selectLesson,
      onLikeCoursePress,
      onBuyCoursePress,
      onByModalConfirm,
      onRelatedCoursePress,
    } = this;
    const { t, colors } = this.props;
    return (
      <AppLayout>
        <CourseDetailContext.Provider value={{ courseData, playingLesson, selectLesson }}>
          <ThemeContext.Consumer>
            {(themeContext) => (
              <View style={[{ flex: 1 }, isLoading && styles.loadingContainer]}>
                {isLoading && (
                  <ActivityIndicator size="large" color={themeContext?.theme?.colors?.primary} />
                )}
                {!isLoading && courseData && (
                  <>
                    <View style={{ width: '100%' }}>
                      <VideoPlayer
                        courseData={courseData}
                        playingLesson={playingLesson}
                        onStopVideo={onStopVideo}
                        onVideoEnded={onVideoEnded}
                        // height={videoHeight}
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
                      <Rating
                        ratedStars={courseData?.formalityPoint}
                        showRating
                        style={styles.section}
                      />
                      <View style={styles.section}>
                        <Text style={{ marginTop: 5 }} type="body">
                          {`${courseData.publishDate} - ${courseData.totalHours} h`}
                        </Text>
                      </View>
                      <View style={[styles.section, styles.iconsWrapper]}>
                        <View style={styles.iconContainer}>
                          <IconButton
                            size={25}
                            roundWidth={25}
                            name="shopping-cart"
                            onPress={onBuyCoursePress}
                            disabled={isBought}
                            disabledColor={colors.primary}
                          />
                          <Text style={styles.iconText} type="subbody" weight="medium">
                            {t('buy_course')}
                          </Text>
                        </View>

                        <View style={styles.iconContainer}>
                          <IconButton
                            size={25}
                            roundWidth={25}
                            name="heart"
                            onPress={onLikeCoursePress}
                            disabled={isLiked}
                            disabledColor="#e74c3c"
                          />
                          <Text style={styles.iconText} type="subbody" weight="medium">
                            {t('like_course')}
                          </Text>
                        </View>

                        <View style={styles.iconContainer}>
                          <IconButton size={25} roundWidth={25} name="cloud-download" />
                          <Text style={styles.iconText} type="subbody" weight="medium">
                            {t('download_course')}
                          </Text>
                        </View>
                      </View>
                      <Text>{`${t('describe_course')} :`}</Text>
                      <Text style={styles.description} type="subbody">
                        {courseData?.description}
                      </Text>
                      <CourseDetailTab.Navigator style={{ marginTop: 15 }}>
                        <CourseDetailTab.Screen
                          name={t('lesson_list')}
                          component={CourseDetailContent}
                        />
                        <CourseDetailTab.Screen name={t('course_comments')} component={View} />
                      </CourseDetailTab.Navigator>

                      {/* ratings */}

                      {/* related courses */}
                      {isArray(courseData?.coursesLikeCategory) &&
                        courseData?.coursesLikeCategory.length > 0 && (
                          <Section
                            sectionTitle={t('course_in_category_title')}
                            onSeeAllPress={() => {}}
                          >
                            <FlatList
                              contentContainerStyle={{ padding: 5 }}
                              data={courseData?.coursesLikeCategory}
                              keyExtractor={(path) => `${path.id}`}
                              horizontal
                              showsHorizontalScrollIndicator={false}
                              renderItem={({ item }) => (
                                <Card
                                  cardTitle={item.title}
                                  cardDescriptions={[
                                    `${item['instructor.user.name']} - ${
                                      !item.price
                                        ? `Miễn phí`
                                        : `${new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                          }).format(item.price)}`
                                    }`,
                                    // item.description,
                                  ]}
                                  cardImage={item.imageUrl}
                                  onPress={() => onRelatedCoursePress(item.id)}
                                >
                                  <Rating
                                    style={{ marginTop: 10 }}
                                    ratedStars={item.formalityPoint}
                                  />
                                </Card>
                              )}
                            />
                          </Section>
                        )}
                    </ScrollView>
                  </>
                )}
                <AppModal
                  title={t('buy_modal_title')}
                  isVisible={feeModalVisible}
                  confirmLabel={t('buy_button_ok')}
                  onConfirm={onByModalConfirm}
                  canBackdropPress={false}
                >
                  <Text style={{ textAlign: 'center' }}>{t('buy_modal_content')}</Text>
                </AppModal>
              </View>
            )}
          </ThemeContext.Consumer>
        </CourseDetailContext.Provider>
      </AppLayout>
    );
  }
}

CourseDetail.contextType = NavigationContext;

const WrappedCourseDetail = (props) => {
  const { colors } = useTheme();
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <CourseDetail {...props} colors={colors} />
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: getCurrentUser(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showFlashMsg: ({ type, description }) => {
      dispatch(
        showFlashMessage({
          type,
          description,
        }),
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation(['course_detail'])(WrappedCourseDetail));
