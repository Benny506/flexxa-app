import { createSlice } from "@reduxjs/toolkit";
import { flexColors, flexrColors } from "../../utils/colors/colors";

const colorSchemeSlice = createSlice({
    name: 'colorSchemeSlice',
    initialState: {
        defaultDark: ''
    },
    reducers: {
        setColorScheme: (state, action) => {
            if(action?.payload?.usertype){
                const usertype = action?.payload?.usertype

                if(usertype === 'flex'){
                    state.defaultDark = flexColors.defaultDark
                
                } else{
                    state.defaultDark = flexrColors.defaultDark
                }
            }
        }
    }
})

export const { setColorScheme } = colorSchemeSlice.actions

export const getColorSchemeState = state => state.colorSchemeSlice

export default colorSchemeSlice.reducer