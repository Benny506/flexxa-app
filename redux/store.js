import { configureStore } from '@reduxjs/toolkit'
import appAlertSlice from './slices/appAlertSlice'
import appLoadingSlice from './slices/appLoadingSlice'
import userDetailsSlice from './slices/userDetailsSlice'


const store = configureStore({
    reducer: {
        appAlertSlice,
        appLoadingSlice,
        userDetailsSlice
    }
})


export default store