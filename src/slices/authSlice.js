import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  institute:localStorage.getItem("institute") ? JSON.parse(localStorage.getItem("institute")) : null,
  signupData: null,
  loading: false,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
    setInstitute(state,value){
      state.institute=value.payload
    }
  },
});

export const { setSignupData, setLoading, setToken , setInstitute} = authSlice.actions;

export default authSlice.reducer;