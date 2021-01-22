import { call, put } from 'redux-saga/effects';
import { onIncCountDelayed, wait } from './counterSaga';
import { incCount, incCountDelayed } from './counterSlice';

test('counterSaga', () => {
  const value = 5;
  const saga = onIncCountDelayed(incCountDelayed(value));
  expect(saga.next()).toEqual({
    done: false,
    value: call(wait, 1000),
  });
  expect(saga.next()).toEqual({
    done: false,
    value: put(incCount(value)),
  });
  expect(saga.next()).toEqual({
    done: true,
  });
});
