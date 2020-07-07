import { ADDING_CLIENT, ADD_CLIENT_SUCCESS, LOADING_CLIENT, LOAD_CLIENT_SUCCESS } from './actionTypes';
import axios from 'axios';

const addingClient = () => {
    return {
        type : ADDING_CLIENT
    }
}

const addClientSuccess = () => {
    return {
        type : ADD_CLIENT_SUCCESS
    }
}

export const addClient = data => {
    return dispatch => {
        dispatch(addingClient());
        axios.post('/clientInfo', data)
           .then(res => {
               if(res.status === 200){
                 dispatch(addClientSuccess());
               }
           })
           .catch(err => {
               console.log(err);
           })
    }
}

const loadingClient = () => {
    return {
        type : LOADING_CLIENT
    }
}

const loadClientSuccess = data => {
    return {
        type : LOAD_CLIENT_SUCCESS,
        data : data
    }
}

export const loadClient = (page, orderType, status) => {
    let url = `https://front-desk-api.herokuapp.com/clientInfo?page=${page}&order=${orderType}&status=${status}`;
    if(status === 'all'){
        url = `https://front-desk-api.herokuapp.com/clientInfo?page=${page}&order=${orderType}`;
    }
    return dispatch => {
        dispatch(loadingClient())
        axios.get(url)
           .then(result => {
               dispatch(loadClientSuccess(result.data));
           })
           .catch(err => {
               console.log(err);
           })
    }
}
