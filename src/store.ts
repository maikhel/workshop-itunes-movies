import { configureStore, Store } from "@reduxjs/toolkit";
import { counterSlice } from './counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

type GetStoreState<S> = S extends Store<infer State, any> ? State : unknown;

export type StoreState = GetStoreState<typeof store>;
