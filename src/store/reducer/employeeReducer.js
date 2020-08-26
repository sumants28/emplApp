import * as actionTypes from '../actions/actionTypes';

const initialState = {
    employees:[]
}

const reducer = (state = initialState,action) => {
    switch(action.type) {
        case actionTypes.GET_EMP:
            return {
                ...state,
                employees:action.employees
            }
        default:
            return state
    }
}

export default reducer;