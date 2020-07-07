import { ADDING_CLIENT, ADD_CLIENT_SUCCESS, LOADING_CLIENT, LOAD_CLIENT_SUCCESS, UPDATE_CLIENT_SUCCESS, UPDATING_CLIENT } from './actionTypes';
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
    let url = `/clientInfo?page=${page}&order=${orderType}&status=${status}`;
    if(status === 'all'){
        url = `/clientInfo?page=${page}&order=${orderType}`;
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

const updatingClient = () => {
    return {
        type : UPDATING_CLIENT
    }
}

const updateClientSuccess = data => {
    return {
        type : UPDATE_CLIENT_SUCCESS
    }
}

export const updateClient = (data, id) => {
    console.log(id);
    return dispatch => {
        dispatch(updatingClient());
        axios.patch(`/updateClientInfo/${id}`, data)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }
}