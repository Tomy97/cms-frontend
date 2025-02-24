import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
interface AuthState {
  email: string
}

const initialState: AuthState = {
  email: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state: AuthState, { payload }) => {
      if (!payload) return
      const decoded: { email: string } = jwtDecode(payload)
      state.email = decoded.email
    }
  }
})

export const { login } = authSlice.actions