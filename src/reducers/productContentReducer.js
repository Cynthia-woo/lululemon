const initState = {
    rawProductList: [],
    sortList: [],
    isLoading: false,
    error: null,
    sortedList: [],
    sortingId: 0
}

export const productContentReducer = (state = initState, action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            // console.log('[reducer-FETCH_SUCCESS-payload1]',action.payload)
            // console.log('[reducer-FETCH_SUCCESS-payload2]',action.payload2)
            // console.log("from=======>fetch success",action.payload)
            let list = action?.payload
            clickSorting(state?.sortingId, list);
            sessionStorage.setItem('productList', JSON.stringify(list));
            return {
                ...state,
                rawProductList: action?.payload,
                sortedList: list,
                isLoading: true,
                sortList: action?.payload2
            }
        case 'SORTING_ALL_LIST':
            let sortedList = state.rawProductList;
            let sortingId = action?.payload;
            clickSorting(sortingId, sortedList);
            // console.log('[reducer-sortedList]',action.payload)
            return {...state, sortingId: action?.payload, rawProductList: sortedList}
        case 'FETCH_ERROR':
            // console.log('[reducer: error]',action.payload)
            return {...state, error: action.payload,};
        default:
            return state;
    }
}


const clickSorting = (index, sortedList) => {
    console.log('unsortedList', sortedList)
    if (index === 3) {
        priceHighLow(sortedList)
    } else if (index === 4) {
        priceLowHigh(sortedList)
    }
    console.log('sortedList', sortedList)
}

const priceHighLow = list => {
    list.sort((a, b) => b.price?.match(/\d+/)[0] - a.price?.match(/\d+/)[0]);
}
const priceLowHigh = list => {
    list.sort((a, b) => a.price?.match(/\d+/)[0] - b.price?.match(/\d+/)[0]);
}