import { createSlice } from "@reduxjs/toolkit";

const setUserSlice = createSlice({
    name: 'setUser',
    initialState: {
        user: {},
        authenticated: false,
        userList: [],
        error: false,
        otp: ''
    },
    reducers: {
        addUser(state, action) {
            state.user = action.payload
        },
        addData(state, action) {
            state.userList = action.payload
        },
        setAuthentication(state) {
            state.authenticated = true
        },
        setErrorTrue(state) {
            state.error = true
        },
        setErrorFalse(state) {
            state.error = false
        },
        setOTP(state, action) {
            state.otp = action.payload
        }
    }
})

export const { addUser, setAuthentication, addData, setErrorTrue, setErrorFalse } = setUserSlice.actions;
export default setUserSlice.reducer;