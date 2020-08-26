import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    error:'',
    userId:''
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                isLoggedIn:action.isLoggedIn,
                userId:action.userId
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error:action.error
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                isLoggedIn:action.isLoggedIn
            }
        default:
            return state;
    }
}

export default reducer;