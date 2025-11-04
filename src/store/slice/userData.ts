import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  token: string | null;
  merchantId: string | null;
  userName?: string | null;
}

const initialState: UserState = {
  token: localStorage.getItem("token") || null,   
  merchantId: localStorage.getItem("merchantId") || null,
  userName: localStorage.getItem("userName") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // ✅ Save token & merchantId
    setUserData: (state, action: PayloadAction<{ token: string; merchantId: string,userName:string }>) => {
      state.token = action.payload.token;
      state.merchantId = action.payload.merchantId;
      state.userName = action.payload.userName || null;

      // Optional: persist in localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("merchantId", action.payload.merchantId);
      localStorage.setItem("userName", action.payload.userName || "");
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
