import { useDispatch, useSelector } from "react-redux"
import supabase from "../database/dbInit"
import { setAppAlert } from "../redux/slices/appAlertSlice"
import { appLoadStart, appLoadStop } from "../redux/slices/appLoadingSlice"
import { getEventsState, setEvents } from "../redux/slices/eventsSlice"
import { getUserDetailsState, setUserDetails } from "../redux/slices/userDetailsSlice"
import { getPublicUrl } from "../utils/apiRequests/requestApi"

export default function useApiReqs() {
    const dispatch = useDispatch()

    const user = useSelector(state => getUserDetailsState(state).user)
    const profile = useSelector(state => getUserDetailsState(state).profile)
    const flexrRequests = useSelector(state => getUserDetailsState(state).flexrRequests)
    const events = useSelector(state => getEventsState(state).events)

    //profile
    const updateProfile = async ({ callBack = () => { }, update = {} }) => {
        try {

            const { data, error } = await supabase
                .from("user_profiles")
                .upsert(
                    {
                        ...profile, //old
                        ...update, //new
                        id: user?.id
                    },
                    {
                        onConflict: "id",
                        ignoreDuplicates: false
                    }
                )
                .select("*")
                .single()

            if (error) {
                console.log("Profile update error:", error)
                throw new Error()
            }

            dispatch(setUserDetails({
                profile: data
            }))

            callBack && callBack({ updatedProfile: data })

            dispatch(setAppAlert({ msg: 'Profile update successful', type: 'success' }))
            dispatch(appLoadStop())

            return;

        } catch (error) {
            apiReqError({ errorMsg: 'Error updating profile' })
            dispatch(appLoadStop())
        }
    }





    // events
    const getEventAttendees = async ({ callBack = () => { }, event_id }) => {
        try {

            if (!event_id) throw new Error();

            dispatch(appLoadStart())

            const { data, error } = await supabase
                .from("event_attendees")
                .select(`
                    *,
                    attendee_profile: user_profiles ( * )    
                `)
                .eq("event_id", event_id)

            if (error) {
                console.log(error)
                throw new Error()
            }

            const enrichedEventAttendees = await Promise.all(
                data?.map(async attendee => {
                    const { attendee_profile } = attendee

                    const { publicUrl } = await getPublicUrl({ filePath: attendee_profile?.profile_imgs?.[0], bucket_name: 'user_profiles' })

                    return {
                        ...attendee,
                        image_url: publicUrl
                    }
                })
            )

            callBack({ attendees: enrichedEventAttendees })

            dispatch(appLoadStop())

        } catch (error) {
            apiReqError({ errorMsg: 'Error retrieving event attendees' })
            dispatch(appLoadStop())
        }
    }
    const acceptEventRequest = async ({ callBack = () => { }, event_id }) => {
        try {

            if (!event_id) throw new Error();

            dispatch(appLoadStart())

            const { data, error } = await supabase
                .rpc('accept_event_request', {
                    _flex_id: user?.id,
                    _event_id: event_id
                });

            if (error) throw new Error();

            const updatedEventReqeusts = flexrRequests?.filter(req => req?.event_id !== event_id)

            dispatch(setUserDetails({
                flexrRequests: updatedEventReqeusts
            }))

            callBack({ attendee: data })

            dispatch(setAppAlert({ msg: 'Event request accepted!', type: 'success' }))
            dispatch(appLoadStop())

        } catch (error) {
            apiReqError({ errorMsg: 'Error accepting event request! Try again later.' })
            dispatch(appLoadStop())
        }
    }
    const rejectEventRequest = async ({ callBack = () => { }, event_id }) => {
        try {

            if (!event_id) throw new Error();

            dispatch(appLoadStart())

            const { data, error } = await supabase.rpc('reject_event_request', {
                _flex_id: user?.id,
                _event_id: event_id
            });

            if (error) throw new Error();

            callBack({ rejected: true })

            const updatedEventReqeusts = flexrRequests?.filter(req => req?.event_id !== event_id)
            const updatedEvents = events?.map(e => {
                if(e?.id === event_id){
                    const { event_attendees } = e

                    const attendees = (event_attendees || [])?.filter(ea => ea?.flex_id !== user?.id)

                    return {
                        ...e,
                        event_attendees: attendees
                    }
                }   

                return e
            })

            dispatch(setEvents({
                events: updatedEvents,
                flexId: user?.id
            }))
            dispatch(setUserDetails({
                flexrRequests: updatedEventReqeusts
            }))

            dispatch(setAppAlert({ msg: 'Event request rejected!', type: 'success' }))
            dispatch(appLoadStop())

        } catch (error) {
            apiReqError({ errorMsg: 'Error rejecting event request! Try again later.' })
            dispatch(appLoadStop())
        }
    }
    const fetchEvents = async ({ callBack = () => { } }) => {
        try {

            dispatch(appLoadStart())

            const limit = 1000;
            const from = (events?.length || 0);
            const to = from + limit - 1;

            const { data, error } = await supabase
                .from("events")
                .select(`
                    *,
                    hostInfo: flexr_id ( * ),                    
                    event_attendees (*)
                `)
                .order("created_at", { ascending: false, nullsFirst: false })
                .limit(limit)
                .range(from, to);

            if (error) {
                console.log(error)
                throw new Error()
            }

            if (data?.length === 0) {
                dispatch(appLoadStop())
                dispatch(setAppAlert({ msg: 'All events loaded', type: 'info' }))

                callBack && callBack({ canLoadMore: false })

                return;
            }

            const enrichedEvents = await Promise.all(
                data?.map(async ev => {
                    const { cover_img, hostInfo } = ev

                    const { publicUrl } = await getPublicUrl({
                        filePath: cover_img,
                        bucket_name: 'events',
                    });

                    const { publicUrl: hostInfoProfileUrl } = await getPublicUrl({
                        filePath: hostInfo?.profile_imgs?.[0],
                        bucket_name: 'user_profiles',
                    });

                    return {
                        ...ev,
                        image_url: publicUrl,
                        hostInfo: {
                            ...hostInfo,
                            image_url: hostInfoProfileUrl
                        }
                    }
                })
            )

            dispatch(setEvents({
                events: [...events, ...enrichedEvents],
                flexId: user?.id
            }))

            dispatch(appLoadStop())

            callBack && callBack({ canLoadMore: true })

        } catch (error) {
            apiReqError({ errorMsg: 'Error loading events! Try again later.' })
            dispatch(appLoadStop())
        }
    }
    const requestToParticipate = async ({ callBack = () => { }, event, flexr_id }) => {
        try {

            if (!event || !flexr_id) throw new Error("Incomplete credentials provided");

            dispatch(appLoadStart())

            const { data, error } = await supabase
                .from('flexr_requests')
                .insert({
                    event_id: event?.id,
                    flexr_id,
                    flex_id: user?.id,
                    from: 'flex'
                })
                .select()
                .single()

            if (error) {
                console.log(error)
                throw new Error()
            }

            dispatch(setUserDetails({
                flexrRequests: [
                    ...flexrRequests,
                    {
                        ...data,
                        events: event
                    }
                ]
            }))

            dispatch(setAppAlert({ msg: 'Participation request sent!', type: 'success' }))

            dispatch(appLoadStop())

            callBack && callBack({ requestSent: true })

        } catch (error) {
            console.log(error)
            apiReqError({ errorMsg: "Can't seem to send a participation request at the moment! Try again later." })
            dispatch(appLoadStop())
        }
    }





    const apiReqError = ({ errorMsg }) => {
        dispatch(appLoadStop())
        dispatch(setAppAlert({ msg: errorMsg, type: 'error' }))

        return;
    }

    return {
        //profile
        updateProfile,





        //events
        getEventAttendees,
        acceptEventRequest,
        rejectEventRequest,
        fetchEvents,
        requestToParticipate
    }
}