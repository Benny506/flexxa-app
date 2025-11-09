import { createSlice } from "@reduxjs/toolkit";
import { getEventStatuses, sortByStartTime } from "../../utils/dateUtils";
import { removeDuplicatesByKey } from "../../utils/utils";

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

                const sorted = sortByStartTime(eventsWithStatus)
                const filtered = removeDuplicatesByKey(sorted, 'id')

                state.counts = counts

                state.events = filtered
            }
        }
    }
})

export const { setEvents } = eventsSlice.actions

export const getEventsState = state => state.eventsSlice

export default eventsSlice.reducer