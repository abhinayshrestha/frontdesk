import { ADDING_CLIENT, ADD_CLIENT_SUCCESS, LOADING_CLIENT, LOAD_CLIENT_SUCCESS, UPDATE_CLIENT_SUCCESS, UPDATING_CLIENT, 
        DELETING_CLIENT, DELETE_CLIENT_SUCCESS } from './actionTypes';
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

const updateClientSuccess = (data, id) => {
    return {
        type : UPDATE_CLIENT_SUCCESS,
        id : id,
        data : data
    }
}

export const updateClient = (data, id) => {
    let newData = {};
    newData.id = id;
    for(let [key, value] of Object.entries(data)) {
        if(value !== '' && value !== null) {
            newData[key] = value;
        }
    }
    return dispatch => {
        dispatch(updatingClient());
        axios.patch(`/updateClientInfo/${id}`, newData)
            .then(_ => {
                dispatch(updateClientSuccess(data, id));
            })
            .catch(err => {
                console.log(err.response);
            })
    }
}

const deletingClient = () => {
    return {
        type : DELETING_CLIENT
    }
}

const deleteClientSuccess = id => {
    return {
        type : DELETE_CLIENT_SUCCESS,
        id : id
    }
}

export const deleteClient = id => {
    return dispatch => {
        dispatch(deletingClient());
        axios.delete(`/deleteClientInfo/${id}`)
             .then(res => {
                dispatch(deleteClientSuccess(id));
             })   
             .catch(err => {
                 console.log(err.response);
             })
    }
}