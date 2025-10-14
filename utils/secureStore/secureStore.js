import * as SecureStore from 'expo-secure-store'


export const setValue = async ({ key, value }) => {
    try {
        await SecureStore.setItemAsync(key, value)
        return {
            error: false,
            set: true
        }
    } catch (error) {
        console.log(error)
        return {
            error: 'An unexpected error occured. Try again later!',
            set: false
        }
    }    
}





export const getValue = async ({ key }) => {
    try {
        const value = await SecureStore.getItemAsync(key)
        return {
            error: false,
            value
        }
    } catch (error) {
        console.log(error)
        return {
            error: 'An unexpected error occured. Try again later!',
            value: null
        }
    } 
}