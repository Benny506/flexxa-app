import { createSlice } from "@reduxjs/toolkit";
import { getEventStatuses } from "../../utils/dateUtils";

const userDetailsSlice = createSlice({
    name: 'userDetailsSlice',
    initialState: {
        profile: null,
        user: null,
        session: null,
        phoneData: {
            phone_number: null,
            country_code: null
        },
        flexrRequests: [],
        myRequests: [],
        myEvents: []
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

            //flexrRequests
            if(action?.payload?.flexrRequests){
                const requests = action?.payload?.flexrRequests

                if(requests){
                    const fromMe = requests?.filter(r => r?.from === 'flex')
                    const fromFlexr = requests?.filter(r => r?.from === 'flexr')               

                    state.flexrRequests = fromFlexr
                    state.myRequests = fromMe
                }
            }

            //myEvents
            if(action?.payload?.myEvents){
                const evts = action?.payload?.myEvents
                
                const { eventsWithStatus, counts } = getEventStatuses({ events: evts, currentFlexId: null })

                state.myEvents = eventsWithStatus
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
            state.flexrRequests = []
            state.myRequests = []
            state.myEvents = []
        }
    }
})

export const { setUserDetails, clearUserDetails } = userDetailsSlice.actions

export const getUserDetailsState = state => state.userDetailsSlice

export default userDetailsSlice.reducer