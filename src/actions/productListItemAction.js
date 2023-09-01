const fetchDetails = link => dispatch =>{
    dispatch ({
        type:'FETCH_DETAILS',
        payload: link
    })
    dispatch({
        type:'ISLOADING',
        payload: false
    })

}

const selectColorPattern = (id, index) => dispatch => {
    // console.log("Select_color_id", index)
    dispatch ({
        type: 'SELECT_COLOR_ID',
        payload1: id,
        payload2: index
    })
}
export default {
    fetchDetails,
    selectColorPattern
}
