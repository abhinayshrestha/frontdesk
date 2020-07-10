import { LOADING_RECENT_SUMMARY, LOADING_RECENT_SUMMARY_SUCCESS, DELETING_RECENT_SUMMARY, DELETING_RECENT_SUMMARY_SUCCESS } from './actionTypes';
import axios from 'axios';

const loadingRecentSummary = () => {
    return {
        type : LOADING_RECENT_SUMMARY
    }
}

const loadingRecentSummarySuccess = data => {
    return {
        type : LOADING_RECENT_SUMMARY_SUCCESS,
        data : data
    }
}

export const loadRecentSummary = () => {
    return dispatch => {
        dispatch(loadingRecentSummary());
        axios.get(`/clientInfo?page=${1}&order=desc&status=all&nameFilter=`)
            .then(res => {
                dispatch(loadingRecentSummarySuccess(res.data))
            })
            .catch(err => {
                console.log(err.response);
            })
    }
}

const deletingRecentSummary = () => {
    return {
        type : DELETING_RECENT_SUMMARY
    }
}

const deletingRecentSummarySuccess = id => {
    return {
        type : DELETING_RECENT_SUMMARY_SUCCESS,
        id : id
    }
}

export const deleteRecentSummary = id => {
    return dispatch => {
        dispatch(deletingRecentSummary());
        dispatch(deletingRecentSummarySuccess(id));
        // axios.delete(`/deleteClientInfo/${id}`)
        //      .then(_ => {
        //          dispatch(deletingRecentSummarySuccess(id))
        //      })
        //      .catch(err => {
        //          console.log(err.response);
        //      })   
    }
}