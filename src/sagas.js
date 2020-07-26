import { all } from 'redux-saga/effects';
import userSaga from 'services/user/sagas';

// combine all saga here
function* rootSaga() {
  yield all([userSaga()]);
}

export default rootSaga;
