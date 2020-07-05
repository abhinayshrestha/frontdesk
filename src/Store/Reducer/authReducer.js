import { AUTH_START, AUTH_FAIL, AUTH_SUCCESS, LOG_OUT } from '../Actions/actionTypes';

const initState = {
    loading : false,
    error : false,
    isAuth: false
}

const authReducer = (state = initState, action) => {
    switch(action.type) {
        case AUTH_START : 
                    return {
                        ...state,
                        loading : true,
                        error : false
                    }
        case AUTH_SUCCESS : 
                    return {
                        ...state,
                        loading : false,
                        error : false,
                        isAuth : true
                    }    
        case AUTH_FAIL : 
                    return {
                        ...state,
                        loading : false,
                        error : true
                    }
        case LOG_OUT : 
                      return {
                          ...state,
                          isAuth: false
                      }  
        default : return state                                
    }
}

export default authReducer;