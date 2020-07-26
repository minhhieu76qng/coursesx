import { call, put, takeLatest } from 'redux-saga/effects';
import UserRepo from './repo';
import { setCurrentUser, showFlashMessage } from '../inapp/actions';
import { FETCH_USER_DATA, REGISTER_ACCOUNT } from './constants';

function* fetchCurrentUserData({ meta: { callback } = {} }) {
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

function* registerNewAccount({ payload = {}, meta: { callback } = {} }) {
  try {
    yield call(UserRepo.registerAccount, payload);
    if (typeof callback === 'function') {
      yield call(callback);
    }
  } catch (e) {
    console.log('function*registerNewAccount -> e', e.response);
    yield put(
      showFlashMessage({
        description: e?.response?.data?.message ?? null,
      }),
    );
  }
}

export default function* () {
  yield takeLatest(FETCH_USER_DATA, fetchCurrentUserData);
  yield takeLatest(REGISTER_ACCOUNT, registerNewAccount);
}
