import { useDispatch, useSelector } from "react-redux"
import supabase from "../database/dbInit"
import { setAppAlert } from "../redux/slices/appAlertSlice"
import { appLoadStop } from "../redux/slices/appLoadingSlice"
import { getUserDetailsState, setUserDetails } from "../redux/slices/userDetailsSlice"

export default function useApiReqs(){
    const dispatch = useDispatch()

    const user = useSelector(state => getUserDetailsState(state).user)
    const profile = useSelector(state => getUserDetailsState(state).profile)

    const updateProfile = async ({ callBack=()=>{}, update }) => {
        try {

            const { data, error } = await supabase
                .from("user_profiles")
                .upsert(update)
                .eq('id', user?.id)
                .select("*")
                .single()

            if(error){
                console.log("Profile update error:", error)
                throw new Error()
            }

            dispatch(setUserDetails({
                profile: data
            }))

            callBack({ updatedProfile: data })

            dispatch(setAppAlert({ msg: 'Profile update successful', type: 'success' }))
            
        } catch (error) {
            apiReqError({ errorMsg: 'Error updating profile' })
        
        } finally{
            dispatch(appLoadStop())
        }
    }

    const apiReqError = ({ errorMsg }) => {
        dispatch(appLoadStop())
        dispatch(setAppAlert({ msg: errorMsg, type: 'error' }))

        return;
    }

    return {
        updateProfile
    }
}