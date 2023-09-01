import {HEADER_HOVER_STATE} from "../helper"

export const menuMouseHover = (isHover) => dispatch => {
    // console.log("action")
    dispatch(
        {
            type: HEADER_HOVER_STATE,
            payload: isHover
        }
    )
}