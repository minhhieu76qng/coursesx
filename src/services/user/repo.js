/* eslint-disable class-methods-use-this */
import Api from 'services/Api';

class UserRepo {
  static async registerAccount({ username, email, phone, password }) {
    try {
      const data = await Api({
        method: 'post',
        url: '/user/register',
        body: {
          username,
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
}

export default UserRepo;
