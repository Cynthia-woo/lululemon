import {HEADER_HOVER_STATE} from "../helper";


const headerInitState = {
    isHover: false
}

export const headerReducers = (state = headerInitState, action) => {
    // console.log("reducer")
    switch (action.type){
        case HEADER_HOVER_STATE:
            // console.log("case:",action?.payload)
            return {...state, isHover: action?.payload}
        default:
            return state
    }
}