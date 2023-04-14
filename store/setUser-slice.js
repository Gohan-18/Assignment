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
            console.log(state.user)
        },
        addData(state, action) {
            state.userList = action.payload
            console.log(state.userList)
        },
        setAuthentication(state) {
            state.authenticated = true
            console.log(state.authenticated)
        },
        setErrorTrue(state) {
            state.error = true
            // console.log(state.error)
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