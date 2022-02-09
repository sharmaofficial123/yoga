// Imports: Dependencies
import { all, fork } from 'redux-saga/effects';
import { watchDecreaseCounter, watchIncreaseCounter } from '../saga/counterSaga';
import {watchApiData} from '../saga/apicallSaga'
// import { watchLoginSaga } from './LoginSaga';

// Imports: Redux Sagas
// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([
    
    fork(watchIncreaseCounter),
    fork(watchDecreaseCounter),
    fork(watchApiData),
  ]);
};
 