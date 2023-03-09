import { configureStore } from '@reduxjs/toolkit';
import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import Auth from '../features/auth/reducer';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: storageSession,
};
const persistedReducer = persistReducer(persistConfig, Auth);
const middleware = [thunk];
export const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware,
});

export default store;
