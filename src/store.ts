import { configureStore, Store } from "@reduxjs/toolkit";
import { counterSlice } from './counter/counterSlice';
import { counterSaga } from './counter/counterSaga';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { itunesSlice } from './itunes/itunesSlice';
import { itunesSaga } from './itunes/itunesSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    itunes: itunesSlice.reducer,
  },
  middleware: [sagaMiddleware],
});

function* rootSaga() {
  yield all([counterSaga(), itunesSaga()]);
}

sagaMiddleware.run(rootSaga);

type GetStoreState<S> = S extends Store<infer State, any> ? State : unknown;

export type StoreState = GetStoreState<typeof store>;
