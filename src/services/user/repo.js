/* eslint-disable class-methods-use-this */
import { Api } from 'services/Api';

class UserRepo {
  static async registerAccount({ name, email, phone, password }) {
    try {
      const data = await Api({
        method: 'post',
        url: '/user/register',
        body: {
          name,
          email,
          phone,
          password,
        },
      });
      return data;
    } catch (e) {
      console.log('UserRepo -> registerAccount -> e', e);
      throw e;
    }
  }

  static async loginAccount({ email, password }) {
    try {
      const data = await Api({
        method: 'post',
        url: '/user/login',
        body: {
          email,
          password,
        },
      });
      return data;
    } catch (e) {
      console.log('UserRepo -> loginAccount -> e', e);
      throw e;
    }
  }

  static async getMe() {
    let data = null;
    try {
      data = await Api({
        method: 'get',
        url: '/user/me',
      });
      return data;
    } catch (e) {
      console.log('UserRepo -> getMe -> e', e.response);
      throw e;
    }
  }

  static async isBoughtCourse(courseId) {
    try {
      const {
        payload: { isUserOwnCourse },
      } = await Api({
        method: 'get',
        url: `/user/check-own-course/${courseId}`,
      });
      return isUserOwnCourse;
    } catch (e) {
      console.log('isBoughtCourse -> e', e);
      throw e;
    }
  }

  static async likeCourse(courseId) {
    try {
      const { likeStatus: isLiked } = await Api({
        method: 'post',
        url: '/user/like-course',
        body: {
          courseId,
        },
      });
      return isLiked;
    } catch (e) {
      console.log('likeCourse -> e', e);
      throw e;
    }
  }

  static async isLikedCourse(courseId) {
    try {
      const { likeStatus: isLiked } = await Api({
        method: 'get',
        url: `/user/get-course-like-status/${courseId}`,
      });

      return isLiked;
    } catch (e) {
      console.log('isLikedCourse -> e', e);
      throw e;
    }
  }

  static async getFavoriteCourses() {
    try {
      const { payload: courses } = await Api({
        method: 'get',
        url: '/user/get-favorite-courses',
      });

      return courses;
    } catch (e) {
      console.log('getFavoriteCourses -> e', e);
      throw e;
    }
  }

  static async getProcessingCourses() {
    try {
      const { payload: courses } = await Api({
        method: 'get',
        url: '/user/get-process-courses',
      });

      return courses;
    } catch (e) {
      console.log('getProcessingCourses -> e', e);
      throw e;
    }
  }

  static async requestForgotPasswordToEmail(email) {
    await Api({
      method: 'post',
      url: '/user/forget-pass/send-email',
      body: {
        email,
      },
    });
  }

  static async updateUserProfile({ name, phone, avatar }) {
    const { payload: userInfo } = await Api({
      method: 'put',
      url: '/user/update-profile',
      body: {
        name,
        phone,
        avatar,
      },
    });

    return userInfo;
  }
}

export default UserRepo;
