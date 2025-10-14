import { createSlice } from "@reduxjs/toolkit";

const appAlertSlice = createSlice({
    name: 'appAlertSlice',
    initialState: {
        msg: null,
        type: null,
    },
    reducers: {
        setAppAlert: (state, action) => {
            if(action?.payload){
                const { msg, type } = action?.payload
                if(msg && type){
                    state.msg = msg
                    state.type = type
                }
            }
        },
        clearAppAlert: (state) => {
            state.msg = null
            state.type = null
        }
    }
})

export const { setAppAlert, clearAppAlert } = appAlertSlice.actions

export const getAppAlertState = state => state.appAlertSlice

export default appAlertSlice.reducer