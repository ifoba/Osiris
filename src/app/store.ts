import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import teamsReducer from '../features/Team/TeamSlice';

export const store = configureStore({
  reducer: {
    teams: teamsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
