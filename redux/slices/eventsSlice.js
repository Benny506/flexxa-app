import { createSlice } from "@reduxjs/toolkit";
import { getEventStatuses } from "../../utils/dateUtils";

const eventsSlice = createSlice({
    name: 'eventsSlice',
    initialState: {
        events: [],
        counts: {}
    },
    reducers: {
        setEvents: (state, action) => {
            const evts = action?.payload?.events
            const flexId = action?.payload?.flexId

            if(evts && flexId){
                const { eventsWithStatus, counts } = getEventStatuses({ events: evts, currentFlexId: flexId })

                state.counts = counts

                state.events = eventsWithStatus
            }
        }
    }
})

export const { setEvents } = eventsSlice.actions

export const getEventsState = state => state.eventsSlice

export default eventsSlice.reducer