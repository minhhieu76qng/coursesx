import { call, put, takeLatest } from 'redux-saga/effects';
import UserRepo from './repo';
import { setCurrentUser } from '../inapp/actions';
import { FETCH_USER_DATA } from './constants';

function* fetchCurrentUserData({ payload: { callback } = {} }) {
  try {
    const userData = yield call(UserRepo.getMe);
    if (userData) {
      yield put(setCurrentUser(userData));
    }
  } catch (e) {
    console.log('function*fetchCurrentUserData -> e', e);
  } finally {
    if (typeof callback === 'function') {
      yield call(callback);
    }
  }
}

export default function* () {
  yield takeLatest(FETCH_USER_DATA, fetchCurrentUserData);
}
