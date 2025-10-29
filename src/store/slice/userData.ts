import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  token: string | null;
  merchantId: string | null;
}

const initialState: UserState = {
  token: localStorage.getItem("token") || null,   
  merchantId: localStorage.getItem("merchantId") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // ✅ Save token & merchantId
    setUserData: (state, action: PayloadAction<{ token: string; merchantId: string }>) => {
      state.token = action.payload.token;
      state.merchantId = action.payload.merchantId;

      // Optional: persist in localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("merchantId", action.payload.merchantId);
    },

    // ✅ Clear user data on logout
    clearUserData: (state) => {
      state.token = null;
      state.merchantId = null;
      localStorage.removeItem("token");
      localStorage.removeItem("merchantId");
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
