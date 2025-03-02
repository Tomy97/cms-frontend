import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
interface AuthState {
  email: string
  loginError: string | null
}

const initialState: AuthState = {
  email: '',
  loginError: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: ({ email }: AuthState, { payload }) => {
      if (!payload) return
      const decoded: { email: string } = jwtDecode(payload)
      email = decoded.email
    },
    setLoginError({ loginError }: AuthState, { payload }: PayloadAction<string>) {
      loginError = payload
    }
  }
})

export const { setLogin, setLoginError } = authSlice.actions