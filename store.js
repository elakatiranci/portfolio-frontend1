import { createStore } from 'redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux'; 


const initialState = {
  profileData: {
    id: '',
    username: '',
    email: '',
    password: '',
    profileImage: '/default-profile.png',
  },
  blogs: [],
  projects: [],
};

// Profil için dilim (slice)
const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState.profileData,
  reducers: {
    setProfileData: (state, action) => {
      return { ...state, ...action.payload };
    },
    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
  },
});

// Bloglar için dilim (slice)
const blogSlice = createSlice({
  name: 'blogs',
  initialState: initialState.blogs,
  reducers: {
    setBlogs: (state, action) => action.payload,
    addBlog: (state, action) => {
      state.push(action.payload);
    },
    updateBlog: (state, action) => {
      const index = state.findIndex(blog => blog._id === action.payload._id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteBlog: (state, action) => {
      return state.filter(blog => blog._id !== action.payload);
    },
  },
});

// Global app state için dilim (slice)
const appSlice = createSlice({
  name: 'app',
  initialState: {
    users: [],
    comments: [],
    likes: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    setLikes: (state, action) => {
      state.likes = action.payload;
    },
  },
});

const projectSlice = createSlice({
    name: 'projects',
    initialState: {
      projects: [],
    },
    reducers: {
      setProjects(state, action) {
        state.projects = action.payload;
      },
      addProject(state, action) {
        state.projects.push(action.payload);
      },
      updateProject(state, action) {
        const index = state.projects.findIndex((project) => project._id === action.payload._id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      },
      deleteProject(state, action) {
        state.projects = state.projects.filter((project) => project._id !== action.payload);
      },
    },
  });

// Action'ları export et
export const { setProfileData, setProfileImage } = profileSlice.actions;
export const { setBlogs, addBlog, updateBlog, deleteBlog } = blogSlice.actions;
export const { setUsers, setComments, setLikes } = appSlice.actions;
export const { setProjects, addProject, updateProject, deleteProject } = projectSlice.actions;

// Redux store oluştur
const store = configureStore({
  reducer: {
    profile: profileSlice.reducer,
    blogs: blogSlice.reducer,
    app: appSlice.reducer,
    projects: projectSlice.reducer,
  },
});

export default store;
