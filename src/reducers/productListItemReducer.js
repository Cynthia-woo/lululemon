const initState = {
    allLinks: [],
    detailLinks: [],
    selectedId: [],
    isLoading: true
}
export const productListItemReducer = (state = initState, action) => {
    switch (action.type) {
        case 'FETCH_DETAILS':
            // console.log(action.type, '[reducer]', action.payload)
            return {...state, allLinks: action?.payload, selectedId: new Array(action?.payload.length).fill(0)}
        case 'SELECT_COLOR_ID':
            // console.log(action.type, '[reducer]', action.payload1,"+",action?.payload2);
            const newIdList = [...state.selectedId];
            newIdList[action?.payload1] =action?.payload2;
            // console.log("newIdList:",newIdList)
            return {...state, selectedId: newIdList};
        case 'ISLOADING':
            return {...state, isLoading: action?.payload}
        default:
            return state;
    }
}