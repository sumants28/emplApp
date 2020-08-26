import * as actionTypes from './actionTypes';

export const getEmp = () => {
    return dispatch => {
        const token = JSON.parse(localStorage.getItem('authToken'));
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json','Authorization':token ? token.token:'' }
        }
        return fetch('/employees',requestOptions).then(response => {
            dispatch(saveEmp(JSON.parse(response)));
        }).catch(error => {
            console.log(error);
        })
    }
}

const saveEmp = (Emp) => {
    return{
        type:actionTypes.GET_EMP,
        employees:Emp
    }
}

export const add = (emp) => {
    return dispatch => {
        const token = JSON.parse(localStorage.getItem('authToken'));
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','Authorization':token ? token.token:'' },
            body: JSON.stringify(emp)
        }
        return fetch('/add',requestOptions).then(response => {
            dispatch(getEmp());
        }).catch(error => {
            console.log(error);
        })
    }
}

export const deleteEmp = (code) => {
    return dispatch => {
        const token = JSON.parse(localStorage.getItem('authToken'));
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','Authorization':token ? token.token:'' },
            body: JSON.stringify({code})
        }
        return fetch('/delete',requestOptions).then(response => {
            dispatch(getEmp());
        }).catch(error => {
            console.log(error);
        })
    }
}

export const editEmp = (name,code) => {
    return dispatch => {
        const token = JSON.parse(localStorage.getItem('authToken'));
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','Authorization':token ? token.token:'' },
            body: JSON.stringify({name,code})
        }
        fetch('/edit',requestOptions).then(response => {
            dispatch(getEmp());
        }).catch(error => {
            console.log(error);
        })
    }
}