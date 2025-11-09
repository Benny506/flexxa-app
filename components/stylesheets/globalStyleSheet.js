import { StyleSheet } from "react-native"
import colors from "../../utils/colors/colors"
import { hexToRgba } from "../../utils/utils"

export const textSizes = StyleSheet.create({
    txt8: {
        fontSize: 8
    },
    txt9: {
        fontSize: 9
    },
    txt10: {
        fontSize: 10
    },
    txt11: {
        fontSize: 11
    },
    txt12: {
        fontSize: 12
    },    
    txt13: {
        fontSize: 13
    },
    txt14: {
        fontSize: 14
    },
    txt15: {
        fontSize: 15
    },                
    txt16: {
        fontSize: 16
    },    
    txt17: {
        fontSize: 17
    },
    txt18: {
        fontSize: 18
    },    
    txt19: {
        fontSize: 19
    },    
    txt20: {
        fontSize: 20
    },    
    txt21: {
        fontSize: 21
    },    
    txt22: {
        fontSize: 22
    },    
    txt23: {
        fontSize: 23
    },    
    txt24: {
        fontSize: 24
    },    
    txt25: {
        fontSize: 25
    },    
    txt26: {
        fontSize: 26
    },    
    txt27: {
        fontSize: 27
    },    
    txt28: {
        fontSize: 28
    },    
    txt29: {
        fontSize: 29
    },    
    txt30: {
        fontSize: 30
    },    
    txt31: {
        fontSize: 31
    },    
    txt32: {
        fontSize: 32
    },    
    txt33: {
        fontSize: 33
    },    
    txt34: {
        fontSize: 34
    },    
    txt35: {
        fontSize: 35
    },    
    txt36: {
        fontSize: 36
    },    
    txt37: {
        fontSize: 37
    },    
    txt38: {
        fontSize: 38
    },    
    txt39: {
        fontSize: 39
    },    
    txt40: {
        fontSize: 40
    },    
    txt41: {
        fontSize: 41
    },    
    txt42: {
        fontSize: 42
    },    
    txt43: {
        fontSize: 43
    },    
    txt44: {
        fontSize: 44
    },    
    txt45: {
        fontSize: 45
    },    
    txt46: {
        fontSize: 46
    },    
    txt47: {
        fontSize: 47
    },    
    txt48: {
        fontSize: 48
    },    
    txt49: {
        fontSize: 49
    },    
    txt50: {
        fontSize: 50
    },    
})


export const fontFamilies = StyleSheet.create({
    LatoBold: {
        fontFamily: 'LatoBold'
    },
    LatoLight: {
        fontFamily: 'LatoLight'
    },
    LatoRegular: {
        fontFamily: 'LatoRegular'
    },
    LatoThin: {
        fontFamily: 'LatoThin'
    },
})


export const inputStyles = StyleSheet.create({
    input1: {
        borderColor: hexToRgba({ hex: colors._7E7E7E, opacity: 0.2 }),
        paddingVertical: 15,
        paddingHorizontal: 12.5,
        borderRadius: 10,
        borderWidth: 1
    },
    input1Text: {
        color: colors._000,
        fontFamily: fontFamilies.LatoRegular.fontFamily,
        fontSize: textSizes.txt14.fontSize,
    }
})