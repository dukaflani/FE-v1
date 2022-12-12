import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   video: {},
   is_fan: {},
   videoSearchResults: [],
  }

export const videosSlice = createSlice({
    name: "videos",
    initialState,
    reducers: { 
        loadCurrentVideo: (state, action) => {
            state.video = action.payload
        },
        loadFanStatus: (state, action) => {
            state.is_fan = action.payload
        },
        loadVideoSearchResults: (state, action) => {
            state.videoSearchResults = action.payload
        },
    },
})


export const { loadCurrentVideo } = videosSlice.actions

export default videosSlice.reducer
