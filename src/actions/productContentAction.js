import {API_KEY} from "../helper";
import {useSelector} from "react-redux";
import {setLikeList} from "./setLikeList";

// const myKey = "ktMGQiqb%2BYsc2EAidNSTpQBykU/xHZbqjD4XjVg0f5Myle6Ux7WutZjUWbi6OvGFHc%2B2ZobDtQU6NE4Z1j%2BTPTZDg7luxs/hzbsFwO408sT8W38xInqJItNCFj2JNq6zkyRkUn7mDEdLla4itlXSGP6IaroBriMQkmYRj5khwAA=";
// const productUrl = `http://api-lulu.hibitbyte.com/product/allProducts?mykey=${myKey}`;


// zhequn code
// export const fetchData = () => async (dispatch) => {
//     console.log("from fetchData+++")
//     try {
//
//         await axios.get("lulu.json")
//             .then(res=>{
//             console.log('[from_local]',res.data.rs.filters)
//             let rawChoice = res.data.rs.filters;
//             let filteredChoice = [];
//             // console.log(rawChoice);
//             for (const key in rawChoice) {
//                 if(rawChoice.hasOwnProperty(key)){
//                     if(rawChoice[key][0]){
//                         for (let i = 0; i< rawChoice[key].length; i++){
//                             filteredChoice.push(rawChoice[key][i])
//                         }
//                     }
//                 }
//             }
//             filteredChoice = filteredChoice.filter(item=> item.isChecked === true);
//             // console.log('filtered',filteredChoice);
//             // console.log(filteredChoice.map(item=>item.name??item.alt));
//
//         dispatch({
//             type: 'FETCH_SUCCESS',
//             payload: res.data.rs.products,
//             payload2: filteredChoice.map(item=>item.name??item.alt)
//         });
//     });
//         // Log the data received from the JSON file
//         // console.log('[action]', res.data.rs.products);
//         // Dispatch the success action with the fetched data
//         // dispatch({ type: 'FETCH_SUCCESS', payload: res.data.rs.products});
//
//     } catch (error) {
//         // Dispatch the error action if fetching fails
//         dispatch({ type: 'FETCH_ERROR', payload: error.message });
//     }
// };
//
// const selectItemColor = id => {
//     return {
//         type:"SELECT_ITEM_COLOR",
//         payload:id
//     }
// }


// const fetchData = (filterClick) => dispatch => {
//     let allItems = [];
//
//     fetch(`http://api-lulu.hibitbyte.com/product/allProducts?mykey=${API_KEY}&sortingId=1&page=1`, {
//     // fetch("lulu.json", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(filterClick),
//     })
//         .then(res => res.json())
//         .then(data => {
//             console.log('fetch data============>data',data.rs)
//
//             // filter repeated item
//             const uniqueItemList = data.rs.products.reduce((arr,cur)=>{
//                 const foundItem = arr.find(item=>item.productId===cur.productId);
//                 !foundItem && arr.push(cur);
//                 return arr;
//             },[]).filter(item=>{return item !== null && item !== undefined && item !== ''})
//
//             sessionStorage.setItem('productList', JSON.stringify(uniqueItemList));
//
//             let rawChoice = data.rs.filters;
//             // console.log('fetch data============>filters',rawChoice)
//             let filteredChoice = [];
//             for (const key in rawChoice) {
//                 if (rawChoice.hasOwnProperty(key)) {
//                     if (rawChoice[key][0]) {
//                         for (let i = 0; i < rawChoice[key].length; i++) {
//                             filteredChoice.push(rawChoice[key][i]);
//                         }
//                     }
//                 }
//             }
//             filteredChoice = filteredChoice.filter(item => item.isChecked === true);
//             // console.log('fetch data============>filterChoice',filteredChoice);
//             dispatch({
//                 type: 'FETCH_SUCCESS',
//                 // payload: data.rs.products,
//                 payload: uniqueItemList,
//                 payload2: filteredChoice.map(item => item.name ?? item.alt),
//             });
//
//         })
//         .catch(error => {
//             // 如果请求失败，则发起错误 action
//             dispatch({ type: 'FETCH_ERROR', payload: error.message });
//         });
// };


// fetch all items
const fetchData = (filterClick) => async (dispatch) => {
    try {
        const allItems = [];

        const initialResponse = await fetch(`http://api-lulu.hibitbyte.com/product/allProducts?mykey=${API_KEY}&sortingId=1&page=1`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(filterClick),
        });

        const initialData = await initialResponse.json();
        allItems.push(...initialData.rs.products);

        // TODO: Fetch All Items -- finished
        // const fetchPromises = [];
        // for (let i = 1; i < initialData.rs.pageParams.totalPage; i++) {
        //     fetchPromises.push(
        //         fetch(`http://api-lulu.hibitbyte.com/product/allProducts?mykey=${API_KEY}&sortingId=1&page=${i + 1}`, {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify(filterClick),
        //         }).then(res => res.json())
        //     );
        // }
        //
        // const pageResponses = await Promise.all(fetchPromises);
        // pageResponses.forEach(pageData => {
        //     allItems.push(...pageData.rs.products);
        // });


        const rawChoice = initialData.rs.filters;
        const filteredChoice = Object.values(rawChoice)
            .flatMap(array => array.filter(item => item.isChecked))
            .map(item => item.name ?? item.alt);


        // filter repeated item
        const uniqueItemList = allItems.reduce((arr, cur) => {
            const foundItem = arr.find(item => item.productId === cur.productId);
            !foundItem && arr.push(cur);
            return arr;
        }, []).filter(item => {
            return item !== null && item !== undefined && item !== ''
        })

        uniqueItemList.filter(item => item.price?.match(/\d+/)[0] !== null)

        sessionStorage.setItem('productList', JSON.stringify(uniqueItemList));

        dispatch({
            type: 'FETCH_SUCCESS',
            payload: uniqueItemList,
            payload2: filteredChoice,
        });
    } catch (error) {
        dispatch({type: 'FETCH_ERROR', payload: error.message});
    }


};


const sortDataId = id => dispatch => {
    console.log('[Action:SortingId]', id)
    dispatch({
        type: 'SORTING_ID',
        payload: id,
    })
}

// update first page sorting list
const clickSorting = (index) => {
    return{
        type: 'SORTING_ALL_LIST',
        payload: index,
    }
}


export default {
    fetchData,
    sortDataId,
    clickSorting
}