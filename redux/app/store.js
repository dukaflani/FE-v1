import { configureStore } from '@reduxjs/toolkit'

import { apiSlice } from '../app/apiSlice'
import { videosApiSlice } from '../features/videos/videosApiSlice'
import authReducer from '../features/auth/authSlice'
import videosReducer from '../features/videos/videosSlice'
import navigationReducer from '../features/navigation/navigationSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [videosApiSlice.reducerPath]: videosApiSlice.reducer,
    auth: authReducer,
    videos: videosReducer,
    navigation: navigationReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(videosApiSlice.middleware),
});