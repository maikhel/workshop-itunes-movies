import { ActionCreatorWithPayload, PayloadAction } from '@reduxjs/toolkit';
import { incCount, incCountDelayed } from './counterSlice';
import { put, takeEvery } from 'redux-saga/effects';

type PayloadActionFromCreator<AC> = AC extends ActionCreatorWithPayload<infer P> ? PayloadAction<P> : unknown;


export async function wait(ms: number){
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function* onIncCountDelayed(
  action: PayloadActionFromCreator<typeof incCountDelayed>
) {
  yield wait(1000);
  yield put(incCount(action.payload));

}

export function* counterSaga() {
  yield takeEvery(incCountDelayed.type, onIncCountDelayed);
}
