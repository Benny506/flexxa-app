import { createSlice } from "@reduxjs/toolkit";

const userDetailsSlice = createSlice({
    name: 'userDetailsSlice',
    initialState: {
        profile: null,
        user: null,
        session: null,
        phoneData: {
            phone_number: null,
            country_code: null
        }
    },
    reducers: {
        setUserDetails: (state, action) => {
            //profile
            if (action?.payload?.profile) {
                state.profile = action?.payload?.profile
            }

            //user
            if (action?.payload?.user) {
                state.user = action?.payload?.user
            }

            //session
            if (action?.payload?.session) {
                state.session = action?.payload?.session
            }

            //phoneData
            if(action?.payload?.phoneData){
                state.phoneData = action?.payload?.phoneData
            }
        },

        clearUserDetails: (state, action) => {
            state.profile = null
            state.user = null
            state.session = null
            state.phoneData = {
                phone_number: null,
                country_code: null
            }
        }
    }
})

export const { setUserDetails, clearUserDetails } = userDetailsSlice.actions

export const getUserDetailsState = state => state.userDetailsSlice

export default userDetailsSlice.reducer