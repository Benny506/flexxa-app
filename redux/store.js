import { configureStore } from '@reduxjs/toolkit'
import appAlertSlice from './slices/appAlertSlice'
import appLoadingSlice from './slices/appLoadingSlice'


const store = configureStore({
    reducer: {
        appAlertSlice,
        appLoadingSlice
    }
})


export default store