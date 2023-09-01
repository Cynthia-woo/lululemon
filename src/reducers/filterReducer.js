const initState = {
    gender: '',

    genderIsExpand: true,
    categoryIsExpand: true,
    typeIsExpand: true,
    activityIsExpand: true,
    sizeIsExpand: true,
    sizeTypeIsExpand: true,
    colourIsExpand: true,
    collectionIsExpand: true,
    featuresIsExpand: true,
    fabricIsExpand: true,

    // genderIsExpand: false,
    // categoryIsExpand: false,
    // typeIsExpand: false,
    // activityIsExpand: false,
    // sizeIsExpand: false,
    // sizeTypeIsExpand: false,
    // colourIsExpand: false,
    // collectionIsExpand: false,
    // featuresIsExpand: false,
    // fabricIsExpand: false,

    categoryIsViewMore: false,
    typeIsViewMore: false,
    activityIsViewMore: false,
    sizeIsViewMore: false,
    colourIsViewMore: false,
    collectionIsViewMore: false,
    featuresIsViewMore: false,
    fabricIsViewMore: false,

    clickedIndexes: [],

    // isHeaderExpand: {
    //     Gender: false,
    //     Category:false,
    //     Type:false,
    //     Activity:false,
    //     Size:false,
    //     SizeType:false,
    //     Colour:false,
    //     Collection:false,
    //     Features:false,
    //     Climate:false,
    //     Fabric:false,
    // }
}

export const filterReducer = (state = initState, action) => {
    switch (action.type) {
        case 'setGender':
            const { gender } = action.payload;
            return {...state, gender};
        case 'blockDropDown':
            const name = action?.payload
            const genderIsExpand = name === 'gender'? state.genderIsExpand = !state.genderIsExpand : state.genderIsExpand
            const categoryIsExpand = name === 'category'? state.categoryIsExpand = !state.categoryIsExpand : state.categoryIsExpand
            const typeIsExpand = name === 'type'? state.typeIsExpand = !state.typeIsExpand : state.typeIsExpand
            const activityIsExpand = name === 'activity'? state.activityIsExpand = !state.activityIsExpand : state.activityIsExpand
            const sizeIsExpand = name === 'size'? state.sizeIsExpand = !state.sizeIsExpand : state.sizeIsExpand
            const sizeTypeIsExpand = name === 'sizeType'? state.sizeTypeIsExpand = !state.sizeTypeIsExpand : state.sizeTypeIsExpand
            const colourIsExpand = name === 'colour'? state.colourIsExpand = !state.colourIsExpand : state.colourIsExpand
            const collectionIsExpand = name === 'collection'? state.collectionIsExpand = !state.collectionIsExpand : state.collectionIsExpand
            const featuresIsExpand = name === 'features'? state.featuresIsExpand = !state.featuresIsExpand : state.featuresIsExpand
            const fabricIsExpand = name === 'fabric'? state.fabricIsExpand = !state.fabricIsExpand : state.fabricIsExpand
            return {...state, genderIsExpand,categoryIsExpand,typeIsExpand,activityIsExpand,sizeIsExpand,sizeTypeIsExpand,colourIsExpand,collectionIsExpand,featuresIsExpand,fabricIsExpand};
            // const itemIsExpand = action.payload
            // const updatedIsHeaderExpand = {
            //     ...state.isHeaderExpand,
            //     [itemIsExpand]: !state.isHeaderExpand[itemIsExpand],
            // }
            // console.log("from reducer======>",updatedIsHeaderExpand)
            // return {
            //     ...state,
            //     isHeaderExpand: updatedIsHeaderExpand,
            // }
        case 'viewMore':
            const viewName = action?.payload
            const categoryIsViewMore = viewName === 'category'? state.categoryIsViewMore = !state.categoryIsViewMore : state.categoryIsViewMore
            const typeIsViewMore = viewName === 'type'? state.typeIsViewMore = !state.typeIsViewMore : state.typeIsViewMore
            const activityIsViewMore = viewName === 'activity'? state.activityIsViewMore = !state.activityIsViewMore : state.activityIsViewMore
            const sizeIsViewMore = viewName === 'size'? state.sizeIsViewMore = !state.sizeIsViewMore : state.sizeIsViewMore
            const colourIsViewMore = viewName === 'colour'? state.colourIsViewMore = !state.colourIsViewMore : state.colourIsViewMore
            const collectionIsViewMore = viewName === 'collection'? state.collectionIsViewMore = !state.collectionIsViewMore : state.collectionIsViewMore
            const featuresIsViewMore = viewName === 'features'? state.featuresIsViewMore = !state.featuresIsViewMore : state.featuresIsViewMore
            const fabricIsViewMore = viewName === 'fabric'? state.fabricIsViewMore = !state.fabricIsViewMore : state.fabricIsViewMore
            console.log(categoryIsViewMore)
            return {...state, categoryIsViewMore, typeIsViewMore, activityIsViewMore, sizeIsViewMore, colourIsViewMore, collectionIsViewMore, featuresIsViewMore, fabricIsViewMore};
        case 'isClick':
            const clickedIndex = action?.payload;
            // console.log(clickedIndex)
            const clickedIndexes = state.clickedIndexes.includes(clickedIndex)
                ? state.clickedIndexes.filter((index) => index !== clickedIndex)
                : [...state.clickedIndexes, clickedIndex];
            return {...state, clickedIndexes}
        default:
            return state
    }
}



