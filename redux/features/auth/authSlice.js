import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {}, 
        userProfile: {},
    },
    reducers: {
        setCredentials: ( state, action ) => {
            state.user = action.payload
        },
        setUserProfile: ( state, action ) => {
            state.userProfile = action.payload
        },
        logOut: ( state ) => {
            state.user = {}
            state.userProfile = {}
        }
    },
})


export const { setCredentials, setUserProfile, logOut } = authSlice.actions
export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user