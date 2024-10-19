import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  username: '',
  email: '',
  password: '',
  profileImage: '/default-profile.png',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileData: (state, action) => {
      return { ...state, ...action.payload };
    },
    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
  },
});

export const { setProfileData, setProfileImage } = profileSlice.actions;
export default profileSlice.reducer;
