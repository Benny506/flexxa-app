import { createSlice } from "@reduxjs/toolkit";

const appLoadingSlice = createSlice({
    name: 'appLoadingSlice',
    initialState: {
        appLoading: false,
        appLoadText: null
    },
    reducers: {
        appLoadStart: (state, action) => {
            state.appLoading = true
            state.appLoadText = action?.payload?.appLoadText
        },
        appLoadStop: (state) => {
            state.appLoading = false
        }
    }
}) 


export const { appLoadStart, appLoadStop } = appLoadingSlice.actions

export const getAppLoadingState = state => state.appLoadingSlice

export default appLoadingSlice.reducer