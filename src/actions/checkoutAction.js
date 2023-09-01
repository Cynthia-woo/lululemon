import {API_KEY} from "../helper";

const signIn = (userLogIn) => async (dispatch) => {
    try{
        const initialResponse = await fetch(`http://api-lulu.hibitbyte.com/auth/login?mykey=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: userLogIn,
        });

        const initialData = await initialResponse.json();
        // console.log(initialData);
        if (initialData.status === 'Success'){
            // console.log('[checkoutAction]:Success',initialData.data)
            // console.log('[checkoutAction]:Success token',initialData.data.token)
        dispatch({
            type:'USER_LOGIN',
            payload:true,
            payload1:initialData.data.token,
            payload2:initialData.data.user
        })
        }else{
            console.log('[checkoutAction]:Failed',initialData.message)
            dispatch({
                type:'USER_LOGIN_FAILED',
                payload:false,
            })
        }


    }catch (error){
        console.log(error.message);
    }
}

export default {
    signIn
}