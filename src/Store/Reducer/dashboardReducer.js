import { LOADING_RECENT_SUMMARY, LOADING_RECENT_SUMMARY_SUCCESS, DELETING_RECENT_SUMMARY, DELETING_RECENT_SUMMARY_SUCCESS,
        EDIT_RECENT_SUMMARY_SUCCESS } from '../Actions/actionTypes';

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
                        const index = state.recentVisitors.findIndex(visitor => visitor.id === action.id[0]);
                        const newVisitors = [...state.recentVisitors];
                        newVisitors.splice(index, 1);
                        console.log([action.id]);
                        return {
                            ...state,
                            recentVisitors : [...newVisitors],
                            deletingRecentVisitors : false
                        }         
        case EDIT_RECENT_SUMMARY_SUCCESS : 
                        const i = state.recentVisitors.findIndex(visitor => visitor.id === action.id);
                        const updated = [...state.recentVisitors];
                        updated[i].name = action.name;
                        updated[i].email = action.email;
                        updated[i].status = action.status;
                        return {
                            ...state,
                            recentVisitors : [...updated]
                        }
                        
        default : return state;                
    }
}

export default dashboardReducer;