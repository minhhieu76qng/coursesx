import { all } from 'redux-saga/effects';
import userSaga from 'services/user/sagas';
import coursesSaga from 'services/courses/sagas';

// combine all saga here
function* rootSaga() {
  yield all([userSaga(), coursesSaga()]);
}

export default rootSaga;
