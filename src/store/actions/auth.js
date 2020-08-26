import * as actionTypes from './actionTypes';

export const authStart = (username,password) => {
    return dispatch => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        }
        fetch('/auth',requestOptions).then(response => {
           localStorage.setItem('authToken',response);
           dispatch(authSuccess(response.username));
        })
        .catch(error => {
            dispatch(authFail(error));
        })
    }
}

const authSuccess = (username) => {
    return {
        type:actionTypes.AUTH_SUCCESS,
        userId:username,
        isLoggedIn:true
    }
}

const authFail = (error) => {
    return {
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const autoLogin = () => {
    return dispatch => {
        const token = JSON.parse(localStorage.getItem('authToken'));
        if(token) {
            dispatch(authSuccess(token.username)); 
        }
    }
}

export const authLogout = () => {
    return dispatch => {
        localStorage.removeItem('authToken');
        dispatch(logout());
    }
}

const logout = () => {
    return {
        type:actionTypes.LOGOUT,
        isLoggedIn:false
    }
}