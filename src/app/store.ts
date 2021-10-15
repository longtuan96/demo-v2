import createSagaMiddleware from '@redux-saga/core';
import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import weatherReducer from '../features/weather/WeatherSlice';
import rootSaga from './rootSaga';

const sagaMiddleWare = createSagaMiddleware();

const reducers = combineReducers({ counterReducer, weatherReducer });

export const store = configureStore({
  reducer: {
    reducers,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleWare),
});

sagaMiddleWare.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
