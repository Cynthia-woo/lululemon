import {API_KEY} from "../helper";

export const fetchProductInfo = (realProductId, colorId) => dispatch => {
    fetch(`http://api-lulu.hibitbyte.com/product/${realProductId}?mykey=` + API_KEY)
        .then(res => res.json())
        .then(data => {
            const realProductInfo = data
            // console.log('fetching real product info ============>', realProductInfo)

            // when colorId is null/''/undefined
            if (colorId === undefined || colorId === null || colorId === '') {
                colorId = data?.rs?.swatches[0].colorId;
                console.log('colorId', data?.rs?.swatches[0].colorId)
            }

            dispatch({
                type: 'fetchProductInformation',
                payload: realProductInfo,
                payload2: colorId
            })
        })
        .catch(error => {
            console.error("Error fetching real product info:", error)
        })
}

export const getSelectColorId = (selectColorId) => {
    return {
        type: 'getSelectColorId',
        payload: selectColorId
    }
}

export const getSelectSize = (selectSize) => {
    return {
        type: 'getSelectSize',
        payload: selectSize,
    }
}

export const getSelectImgId = (selectImgId) => {
    return {
        type: 'getSelectImgId',
        payload: selectImgId
    }
}

export const moveRight = (selectImgId, mainCarouselImagesLength) => {
    return {
        type: 'moveRight',
        payload: selectImgId,
        payload2: mainCarouselImagesLength,
    }
}

export const moveLeft = (selectImgId, mainCarouselImagesLength) => {
    return {
        type: 'moveLeft',
        payload: selectImgId,
        payload2: mainCarouselImagesLength,
    }
}