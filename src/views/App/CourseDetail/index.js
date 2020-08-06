import React from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import moment from 'moment';
import { ThemeContext } from 'react-native-elements';
import { connect } from 'react-redux';
import AppLayout from 'layouts/AppLayout';
import Text from 'components/Text';
import Badge from 'components/Badge';
import Avatar from 'components/Avatar';
import IconButton from 'components/IconButton';

import styles from './styles';
import CourseDetailContent from '../../../components/CourseDetailContent';
import CourseRepo from '../../../services/courses/repo';
import { getCurrentUser } from '../../../services/inapp/getters';
import CourseDetailContext from './CourseDetailContext';
import VideoPlayer from '../../../components/VideoPlayer';
import UserRepo from '../../../services/user/repo';

const CourseDetailTab = createMaterialTopTabNavigator();

class CourseDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      courseData: null,
      playingLesson: null,
    };
  }

  componentDidMount() {
    this.fetchCourse();
  }

  onAuthorPress = () => {};

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

  async fetchCourse() {
    try {
      const { courseId } = this.props?.route?.params;
      const { currentUser } = this.props;
      const [course, isBought] = await Promise.all([
        CourseRepo.getCourseDetail(courseId, currentUser?.id),
        UserRepo.isBoughtCourse(courseId),
      ]);

      if (course) {
        course.isBought = isBought;
        course.publishDate = moment(new Date(course.createdAt)).format('DD/MM/YYYY');
        const lessonId = course?.section?.[0].lesson?.[0]?.id;
        const [author] = await Promise.all([
          CourseRepo.getSingleAuthor(course.instructorId),
          // CourseRepo.getCourseProcess(course.id),
          lessonId && this.selectLesson(lessonId),
        ]);
        course.author = author;
        this.setState({
          courseData: course,
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
    const { isLoading, courseData, playingLesson } = this.state;
    const { onAuthorPress, onStopVideo, onVideoEnded, selectLesson } = this;
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
                      <View style={styles.section}>
                        <Text style={{ marginTop: 5 }} type="body">
                          {`${courseData.publishDate} - ${courseData.totalHours} h`}
                        </Text>
                      </View>
                      <View style={[styles.section, styles.iconsWrapper]}>
                        <View style={styles.iconContainer}>
                          <IconButton size={25} roundWidth={25} name="heart-o" />
                          <Text style={styles.iconText} type="subbody" weight="medium">
                            Yêu thích
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
            )}
          </ThemeContext.Consumer>
        </CourseDetailContext.Provider>
      </AppLayout>
    );
  }
}

CourseDetail.contextType = NavigationContext;

const mapStateToProps = (state) => {
  return {
    currentUser: getCurrentUser(state),
  };
};

export default connect(mapStateToProps)(CourseDetail);
