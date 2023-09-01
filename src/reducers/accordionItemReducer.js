const initState = {
    expandIndex: undefined,
    expandingList:[]
}

export const accordionItemReducer = (state = initState, action) =>{
    switch (action.type){
        case 'expand_item':
            const id = action?.payload;
            // console.log('id',id);
            const newList = new Array(state.expandingList?.length??0).fill(false);
            newList[id] = true;
            // console.log('newList',newList)
            return {...state, expandIndex: action.payload,expandingList: newList}
        case 'default_expanding_list':
            return {...state, expandingList: action.payload}
        default:
            return state;
    }
}