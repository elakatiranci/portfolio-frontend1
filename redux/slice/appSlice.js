import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  comments: [],
  likes: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
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

export const { setUsers, setComments, setLikes } = appSlice.actions;
export default appSlice.reducer;
