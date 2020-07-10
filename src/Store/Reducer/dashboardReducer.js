import { LOADING_RECENT_SUMMARY, LOADING_RECENT_SUMMARY_SUCCESS, DELETING_RECENT_SUMMARY, DELETING_RECENT_SUMMARY_SUCCESS } from '../Actions/actionTypes';

const initState = {
    recentVisitors : [],
    loadingRecentVisitors : false,
    deletingRecentVisitors : false
}

const dashboardReducer = (state = initState, action) => {
    switch(action.type){
        case LOADING_RECENT_SUMMARY : 
                        return {
                            ...state,
                            loadingRecentVisitors : true
                        }
        case LOADING_RECENT_SUMMARY_SUCCESS : 
                        return {
                            ...state,
                            recentVisitors : [...action.data],
                            loadingRecentVisitors : false
                        }       
        case DELETING_RECENT_SUMMARY : 
                        return {
                            ...state,
                            deletingRecentVisitors : true
                        }
        case DELETING_RECENT_SUMMARY_SUCCESS : 
                        const index = state.recentVisitors.findIndex(visitor => visitor.id === action.id);
                        const newVisitors = [...state.recentVisitors];
                        newVisitors.splice(index, 1);
                        return {
                            ...state,
                            recentVisitors : [...newVisitors],
                            deletingRecentVisitors : false
                        }                          
        default : return state;                
    }
}

export default dashboardReducer;