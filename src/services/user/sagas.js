import { call, put, takeLatest, all, takeEvery } from 'redux-saga/effects';
import UserRepo from './repo';
import { setCurrentUser, showFlashMessage } from '../inapp/actions';
import { FETCH_USER_DATA, REGISTER_ACCOUNT, LOGIN_ACCOUNT, LOGOUT } from './constants';
import MessageType from '../inapp/MessageType';
import AsyncStorage from '../../utils/asyncStorage';

function* fetchCurrentUserData({ meta: { callback } = {} }) {
  try {
    const userData = yield call(UserRepo.getMe);
    if (userData?.payload) {
      yield put(setCurrentUser(userData?.payload));
    }
  } catch (e) {
    console.log('function*fetchCurrentUserData -> e', e);
  } finally {
    if (typeof callback === 'function') {
      yield call(callback);
    }
  }
}

function* loginToAccount({ payload: { email, password } = {}, meta: { callback } = {} }) {
  try {
    const userData = yield call(UserRepo.loginAccount, { email, password });
    // save token
    // save data to redux
    yield all([
      call(AsyncStorage.setAccessToken, userData?.token),
      put(setCurrentUser(userData?.userInfo ?? null)),
    ]);

    if (typeof callback === 'function') {
      yield put(
        showFlashMessage({
          type: MessageType.Type.SUCCESS,
          description: 'Đăng nhập thành công!',
        }),
      );
      yield call(callback);
    }
  } catch (e) {
    console.log('function*loginToAccount -> e', e);
    yield put(
      showFlashMessage({
        description: e?.response?.data?.message ?? null,
      }),
    );
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

function* logout() {
  yield put(setCurrentUser(null));
  yield call(AsyncStorage.removeAccessToken);
}

export default function* () {
  yield takeLatest(FETCH_USER_DATA, fetchCurrentUserData);
  yield takeLatest(LOGIN_ACCOUNT, loginToAccount);
  yield takeLatest(REGISTER_ACCOUNT, registerNewAccount);
  yield takeEvery(LOGOUT, logout);
}
