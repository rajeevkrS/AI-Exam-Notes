import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    isCheckingAuth: true,
  },

  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.isCheckingAuth = false;
    },

    setAuthChecking: (state, action) => {
      state.isCheckingAuth = action.payload;
    },

    updateCredits: (state, action) => {
      if (state.userData) {
        state.userData.credits = action.payload;
      }
    },
  },
});

export const { setUserData, setAuthChecking, updateCredits } =
  userSlice.actions;
export default userSlice.reducer;
