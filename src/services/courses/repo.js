/* eslint-disable no-unsafe-finally */
import { Api } from '../Api';

class CourseRepo {
  static async getCategories() {
    try {
      const data = await Api({
        method: 'get',
        url: '/category/all',
      });
      return data;
    } catch (e) {
      console.log('CourseRepo -> getCategories -> e', e);
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
      console.log('CourseRepo -> getAuthorDetail -> e', e);
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
      console.log('CourseRepo -> getAuthors -> e', e);
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
      console.log('getTopSellerCourses -> e', e);
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
      console.log('getTopRatingCourses -> e', e);
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
      console.log('getRecommendCourses -> e', e);
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
      console.log('getCoursesInCategory -> e', e);
      throw e;
    } finally {
      return data;
    }
  }
}

export default CourseRepo;
