import { incCount, incCountDelayed } from './counterSlice';
import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadActionFromCreator } from '../utils';

export async function wait(ms: number){
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function* onIncCountDelayed(
  action: PayloadActionFromCreator<typeof incCountDelayed>
) {
  yield call(wait, 1000);
  yield put(incCount(action.payload));

}

export function* counterSaga() {
  yield takeLatest(incCountDelayed.type, onIncCountDelayed);
}
