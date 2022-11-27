import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    sideNavOpen: false,
    logoDarkMode: true,
    signInModalOpen: false
  }

export const navigationSlice = createSlice({
    name: "navigation",
    initialState,
    reducers: {
        toggleDarkModeLogo: (state) => {
            state.logoDarkMode = !state.logoDarkMode
        },
        togglesideNavOpen: (state) => {
            state.sideNavOpen = !state.sideNavOpen
        },
        toggleSignInModalOpen: (state, action) => {
            state.signInModalOpen = action.payload
        },
    },
})


export const { toggleDarkModeLogo, togglesideNavOpen, toggleSignInModalOpen } = navigationSlice.actions

export default navigationSlice.reducer

