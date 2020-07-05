import { ADDING_CLIENT, ADD_CLIENT_SUCCESS, SET_SUCCESS, LOADING_CLIENT, LOAD_CLIENT_SUCCESS } from '../Actions/actionTypes';

const initState = {
    clients : [],
    loading : false,
    error : false,
    success : false,
}

const manageClientReducer = (state= initState, action) => {
      switch(action.type) {
          case ADDING_CLIENT :
                    return {
                        ...state,
                        loading: true
                    }
          case ADD_CLIENT_SUCCESS :
                    return {
                        ...state,
                        loading: false,
                        success : true,
                        error : false
                    }  
          case LOADING_CLIENT : 
                        return {
                            ...state,
                            loading: true
                        }  
          case LOAD_CLIENT_SUCCESS : 
                        return {
                            ...state,
                            clients : [...action.data],
                            loading : false
                        }                      
          case SET_SUCCESS : 
                    return {
                        ...state,
                        success : false,
                    }
          default : return state;        
      }
}

export default manageClientReducer;