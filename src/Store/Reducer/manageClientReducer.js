import { ADDING_CLIENT, ADD_CLIENT_SUCCESS, SET_SUCCESS, LOADING_CLIENT, LOAD_CLIENT_SUCCESS } from '../Actions/actionTypes';

const initState = {
    clients : [],
    loading : false,
    error : false,
    success : { value : false, label : '' },
    currentPage : 1,
    loadClientLoader : false
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
                        success : {
                            ...state.success,
                            value : true,
                            label : 'Record added Successfully.'
                        },
                        error : false
                    }  
          case LOADING_CLIENT : 
                        return {
                            ...state,
                            loadClientLoader: true
                        }  
          case LOAD_CLIENT_SUCCESS : 
                        return {
                            ...state,
                            clients : [...action.data],
                            loadClientLoader : false
                        }                      
          case SET_SUCCESS : 
                    return {
                        ...state,
                        success : {
                            ...state.success,
                            value : false
                        },
                    }
          default : return state;        
      }
}

export default manageClientReducer;