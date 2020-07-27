import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_CATEGORIES } from './constants';
import CourseRepo from './repo';
import { updateCategories } from '../inapp/actions';

function* fetchCategories({ meta: { callback } = {} }) {
  try {
    const { payload: categories } = yield call(CourseRepo.getCategories);

    yield put(updateCategories(categories));

    if (typeof callback === 'function') {
      yield call(callback);
    }
  } catch (e) {
    console.log('function*fetchCategories -> e', e);
  }
}

export default function* () {
  yield takeLatest(FETCH_CATEGORIES, fetchCategories);
}
