const initialSate = {
    signIn:true,
    token:'',
    signInState:false
}
export const checkoutReducer = (state = initialSate, action) => {
    switch (action.type){
        case 'USER_LOGIN':
            console.log('[checkoutReducer]:Success token',action?.payload1)
            // sessionStorage.setItem('token',action?.payload1)
            return{...state, signIn:action?.payload,token:action?.payload1,signInState: true}
        case 'USER_LOGIN_FAILED':
            // sessionStorage.setItem('token','')
            return{...state, signIn:action?.payload,token:'',signInState: false}
        default:return state;
    }
}
