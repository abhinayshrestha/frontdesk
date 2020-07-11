import { LOADING_TRASH, LOADING_TRASH_SUCCESS, DELETING_FROM_TRASH, DELETING_FROM_TRASH_SUCCESS, SET_TRASH_ACTION,
        LOAD_TRASH_TOTAL_PAGE } from './actionTypes';
import axios from 'axios';

const loadingTrash = () => {
    return {
        type : LOADING_TRASH
    }
}

const loadingTrashSuccess = data => {
    return {
        type : LOADING_TRASH_SUCCESS,
        data : data
    }
}

export const loadTrash = (page, order) => {
    return dispatch => {
        dispatch(loadingTrash());
        axios.get(`/trash?nameFilter=&order=${order}&page=${page}`)
        .then(res => {
            dispatch(loadingTrashSuccess(res.data));
        })
        .catch(err => {
            console.log(err.response);
        })
    }
}

const deletingFromTrash = () => {
    return {
        type : DELETING_FROM_TRASH
    }
}

const deletingFromTrashSuccess = id => {
    return {
        type : DELETING_FROM_TRASH_SUCCESS,
        id : id
    }
}

export const deleteFromTrash = id => {
    return dispatch => {
        dispatch(deletingFromTrash());
        axios.delete(`/deleteFromTrash/${id}`)
            .then(_ => {
                dispatch(deletingFromTrashSuccess(id))
            })    
            .catch(err => {
                console.log(err.response);
            })
    }
}

export const setTrashAction = () => {
    return {
        type : SET_TRASH_ACTION
    }
}

export const loadTrashPages = () => {
    return dispatch => {
        axios.get(`/trash/totalPages`)
           .then(res => {
               dispatch({ type : LOAD_TRASH_TOTAL_PAGE, page : res.data })
           })
           .catch(err => {
               console.log(err.response);
           })
    }
}