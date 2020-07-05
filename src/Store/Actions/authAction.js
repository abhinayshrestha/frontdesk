import { AUTH_START,  AUTH_SUCCESS, LOG_OUT } from '../Actions/actionTypes';

const authStart = () => {
    return {
        type : AUTH_START
    }
}

const authSuccess = () => {
    return {
        type : AUTH_SUCCESS
    }
}

// const authFail = () => {
//     return {
//         type : AUTH_FAIL
//     }
// }

export const onAuth = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        setTimeout(() => {
              dispatch(authSuccess());  
        }, 1000);
    }
}

export const logout = () => {
    return {
        type : LOG_OUT
    }
}