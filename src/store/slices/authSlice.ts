import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setUser(state, action: PayloadAction<string>) {
      state.user = action.payload;
    },
  },
});

export const { setAuth, setUser } = authSlice.actions;

export default authSlice.reducer;
