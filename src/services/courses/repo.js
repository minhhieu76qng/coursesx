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
      console.log('CourseRepo -> getAuthorsList -> authorsDetail', authorsDetail);

      return (authorsDetail || []).map(({ payload }) => payload);
    } catch (e) {
      console.log('CourseRepo -> getAuthors -> e', e);
      throw e;
    }
  }
}

export default CourseRepo;
