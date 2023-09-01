
export const blockDropDown = (expandModuleName) => dispatch =>{
    dispatch({
        type: 'blockDropDown',
        payload: expandModuleName
    })
}

export const setGender = (gender) => {
    return {
        type: 'setGender',
        payload: {gender}
    }
}

export const isClick = (itemIsClick) => {
    return {
        type: 'isClick',
        payload: itemIsClick
    }
}

export const viewMore = (viewMoreModuleName) => {
    return {
        type: 'viewMore',
        payload: viewMoreModuleName
    }
}

// export const fetchProducts = (filterClick) => dispatch => {
//     fetch('http://api-lulu.hibitbyte.com/product/allProducts?mykey=L3SUIr/NXSgrXwtHXwuEfMFTifuXF7nx3n%2B7d1BvAzpZvahmy6ol%2BeZqCcpz5a93z/j42acdVDsCs149vadyRw==', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(filterClick),
//     })
//         .then((response) => response.json())
//         .then((data) => {
//             // 在这里可以将数据保存为 JSON 文件
//             console.log('Response data:', data);
//         })
//         .catch((error) => {
//             console.error('Error fetching data:', error);
//         });
//     dispatch({
//         type:'fetchRealCity',
//         payload: '11'
//     })
// }