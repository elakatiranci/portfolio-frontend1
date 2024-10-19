import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slice/profileSlice';
import blogReducer from './slice/blogSlice';
import appReducer from './slice/appSlice';
import projectReducer from './slice/projectSlice';

const store = configureStore({
  reducer: {
    profile: profileReducer,
    blogs: blogReducer,
    app: appReducer,
    projects: projectReducer,
  },
});

export default store;
