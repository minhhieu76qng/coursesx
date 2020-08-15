import { call, put, takeLatest, all, takeEvery } from 'redux-saga/effects';
import * as Font from 'expo-font';
import UserRepo from './repo';
import { setCurrentUser, showFlashMessage } from '../inapp/actions';
import {
  FETCH_USER_DATA,
  REGISTER_ACCOUNT,
  LOGIN_ACCOUNT,
  LOGOUT,
  UPDATE_USER_INFORMATION,
  BOOT,
} from './constants';
import AsyncStorage from '../../utils/asyncStorage';
import { FETCH_CATEGORIES } from '../courses/constants';
import { initI18n } from '../../i18n';

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

function* updateUserProfile({
  payload: { name, phone, avatar } = {},
  meta: { afterSuccess = () => {}, afterFail = () => {} } = {},
}) {
  try {
    const userData = yield call(UserRepo.updateUserProfile, { name, phone, avatar });

    yield put(setCurrentUser(userData ?? null));

    yield call(afterSuccess);
  } catch (e) {
    console.log('meta:{afterSuccess -> e', e);
    yield call(afterFail);
  }
}

function* appBoot({ meta: { afterSuccess = () => {}, afterFail = () => {} } = {} }) {
  try {
    yield all([
      put({
        type: FETCH_USER_DATA,
      }),
      put({
        type: FETCH_CATEGORIES,
      }),
      call(Font.loadAsync, {
        'Quicksand-Bold': require('assets/fonts/Quicksand-Bold.ttf'),
        'Quicksand-Regular': require('assets/fonts/Quicksand-Regular.ttf'),
        'Quicksand-Light': require('assets/fonts/Quicksand-Light.ttf'),
        'Quicksand-SemiBold': require('assets/fonts/Quicksand-SemiBold.ttf'),
        'Quicksand-Medium': require('assets/fonts/Quicksand-Medium.ttf'),
      }),
      call(initI18n),
    ]);
    yield call(afterSuccess);
  } catch (e) {
    yield call(afterFail);
  }
}

export default function* () {
  yield takeLatest(FETCH_USER_DATA, fetchCurrentUserData);
  yield takeLatest(LOGIN_ACCOUNT, loginToAccount);
  yield takeLatest(REGISTER_ACCOUNT, registerNewAccount);
  yield takeEvery(LOGOUT, logout);
  yield takeLatest(UPDATE_USER_INFORMATION, updateUserProfile);
  yield takeLatest(BOOT, appBoot);
}
