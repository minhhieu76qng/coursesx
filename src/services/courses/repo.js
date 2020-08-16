/* eslint-disable no-unsafe-finally */
import { Api } from '../Api';
import AsyncStorage from '../../utils/asyncStorage';

class CourseRepo {
  static async getCategories() {
    try {
      const data = await Api({
        method: 'get',
        url: '/category/all',
      });
      return data;
    } catch (e) {
      console.log('CourseRepo -> getCategories -> e', e?.response.data.message);
      throw e;
    }
  }

  static async getAuthorDetail(authorId) {
    try {
      const author = await Api({
        url: `/instructor/detail/${authorId}`,
      });
      return author;
    } catch (e) {
      console.log('CourseRepo -> getAuthorDetail -> e', e?.response.data.message);
      return null;
    }
  }

  static async getAuthorsList() {
    try {
      const { payload: authors } = await Api({
        method: 'get',
        url: '/instructor',
      });

      const authorsDetail = await Promise.all(
        (authors || []).map((au) => CourseRepo.getAuthorDetail(au.id)),
      );

      return (authorsDetail || []).map(({ payload }) => payload);
    } catch (e) {
      console.log('CourseRepo -> getAuthors -> e', e?.response.data.message);
      throw e;
    }
  }

  static async getTopSellerCourses({ limit = 10, page = 1 } = {}) {
    let data = [];
    try {
      ({ payload: data } = await Api({
        method: 'post',
        url: '/course/top-sell',
        body: {
          limit,
          page,
        },
      }));
    } catch (e) {
      console.log('getTopSellerCourses -> e', e?.response.data.message);
      throw e;
    } finally {
      return data;
    }
  }

  static async getTopRatingCourses({ limit = 10, page = 1 } = {}) {
    let data = [];
    try {
      ({ payload: data } = await Api({
        method: 'post',
        url: '/course/top-rate',
        body: {
          limit,
          page,
        },
      }));
    } catch (e) {
      console.log('getTopRatingCourses -> e', e?.response.data.message);
      throw e;
    } finally {
      return data;
    }
  }

  static async getLatestCourse({ limit = 10, page = 1 } = {}) {
    let data = [];
    try {
      ({ payload: data } = await Api({
        method: 'post',
        url: '/course/top-new',
        body: {
          limit,
          page,
        },
      }));
    } catch (e) {
      console.log('getLatestCourse -> e', e);
      throw e;
    } finally {
      return data;
    }
  }

  static async getRecommendCourses({ userId, limit = 10, page = 1 } = {}) {
    let data = [];
    try {
      ({ payload: data } = await Api({
        method: 'get',
        url: `/user/recommend-course/${userId}/${limit}/${page - 1}`,
      }));
    } catch (e) {
      console.log('getRecommendCourses -> e', e?.response.data.message);
      throw e;
    } finally {
      return data;
    }
  }

  static async getCoursesInCategory({ categoryId, limit = 10, page = 1 } = {}) {
    let data = [];
    try {
      ({
        payload: { rows: data },
      } = await Api({
        method: 'post',
        url: '/course/search',
        body: {
          keyword: '',
          opt: {
            category: [categoryId],
          },
          limit,
          offset: (page - 1) * limit,
        },
      }));
    } catch (e) {
      console.log('getCoursesInCategory -> e', e?.response.data.message);
      throw e;
    } finally {
      return data;
    }
  }

  static async getCourseDetail(courseId, userId) {
    let data = null;
    try {
      ({ payload: data } = await Api({
        method: 'get',
        url: `/course/get-course-detail/${courseId}/${userId}`,
      }));

      return data;
    } catch (e) {
      console.log('getCourseInfo -> e', e);
      throw e;
    } finally {
      return data;
    }
  }

  static async getCourseWithLessonsById(courseId) {
    let data = null;
    try {
      ({ payload: data } = await Api({
        method: 'get',
        url: `/course/detail-with-lesson/${courseId}`,
      }));

      return data;
    } catch (e) {
      console.log('getCourseWithLessonsById -> e', e?.response.data.message);
      throw e;
    } finally {
      return data;
    }
  }

  static async getSingleAuthor(authorId) {
    let data = null;
    try {
      ({ payload: data } = await Api({
        method: 'get',
        url: `/instructor/detail/${authorId}`,
      }));
    } catch (e) {
      console.log('getSingleAuthor -> e', e?.response?.data?.message);
      throw e;
    } finally {
      return data;
    }
  }

  static async getCourseProcess(courseId) {
    let data = null;
    try {
      ({ payload: data } = await Api({
        method: 'get',
        url: `/course/process-course/${courseId}`,
      }));
    } catch (e) {
      console.log('getCourseProcess -> e', e?.response?.data?.message);
      throw e;
    } finally {
      return data;
    }
  }

  static async updateLearningTime({ lessonId, currentTime = 0 } = {}) {
    try {
      await Api({
        method: 'put',
        url: '/lesson/update-current-time-learn-video',
        body: {
          lessonId,
          currentTime,
        },
      });
    } catch (e) {
      console.log('updateLearningTime -> e', e);
      throw e;
    }
  }

  static async updateFinishLesson(lessonId) {
    try {
      await Api({
        method: 'post',
        url: '/lesson/update-status',
        body: {
          lessonId,
        },
      });
    } catch (e) {
      console.log('updateFinishLesson -> e', e?.response?.data?.message);
      throw e;
    }
  }

  static async getLesson(courseId, lessonId) {
    try {
      const [{ payload: lessonData = {} }, { payload: lessonVideo = {} }] = await Promise.all([
        Api({
          method: 'get',
          url: `/lesson/detail/${courseId}/${lessonId}`,
        }),
        Api({
          method: 'get',
          url: `/lesson/video/${courseId}/${lessonId}`,
        }),
      ]);

      return {
        ...lessonData,
        ...lessonVideo,
      };
    } catch (e) {
      console.log('getLesson -> e', e?.response?.data?.message);
      throw e;
    }
  }

  static async getLastWatchedLesson(courseId) {
    try {
      const { payload } = await Api({
        method: 'get',
        url: `/course/last-watched-lesson/${courseId}`,
      });

      return payload;
    } catch (e) {
      console.log('getLastWatchedLesson -> e', e?.response?.data?.message);
      throw e;
    }
  }

  static async getExercisesInLesson(lessonId) {
    try {
      const {
        payload: { exercises },
      } = await Api({
        method: 'post',
        url: '/exercise/student/list-exercise-lesson',
        body: {
          lessonId,
        },
      });

      return exercises;
    } catch (e) {
      console.log('getExercisesInLesson -> e', e?.response?.data?.message);
      throw e;
    }
  }

  static async getFreeCourse(courseId) {
    try {
      const { freeCourseLink } = await Api({
        method: 'post',
        url: '/payment/get-free-courses',
        body: {
          courseId,
        },
      });

      return freeCourseLink;
    } catch (e) {
      console.log('getFreeCourse -> e', e?.response?.data?.message);
      throw e;
    }
  }

  static async getSearchHistories() {
    try {
      const { payload: histories } = await Api({
        method: 'get',
        url: '/course/search-history',
      });

      return histories?.data || [];
    } catch (e) {
      console.log('getSearchHistories -> e', e);
      throw e;
    }
  }

  static async searchCourses({ keyword, limit = 10, offset = 1 }) {
    try {
      const token = await AsyncStorage.getAccessToken();
      const { payload: { courses, instructors } = {} } = await Api({
        method: 'post',
        url: '/course/searchV2',
        body: {
          token,
          keyword,
          limit,
          offset,
        },
      });

      return { courses, instructors };
    } catch (e) {
      console.log('searchCourses -> e', e);
      throw e;
    }
  }

  static async removeSearchHistory(historyId) {
    try {
      await Api({
        method: 'delete',
        url: `/course/delete-search-history/${historyId}`,
      });
    } catch (e) {
      console.log('removeSearchHistory -> e', e);
      throw e;
    }
  }

  static async rateCourse({ courseId, stars = 1, comment = '' }) {
    try {
      const { payload: ratedData } = await Api({
        method: 'post',
        url: '/course/rating-course',
        body: {
          courseId,
          formalityPoint: stars,
          contentPoint: stars,
          presentationPoint: stars,
          content: comment,
        },
      });

      return ratedData;
    } catch (e) {
      console.log('rateCourse -> e', e);
      throw e;
    }
  }
}

export default CourseRepo;
