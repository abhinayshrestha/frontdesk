import { ADDING_CLIENT, ADD_CLIENT_SUCCESS, SET_SUCCESS, LOADING_CLIENT, LOAD_CLIENT_SUCCESS, UPDATING_CLIENT, UPDATE_CLIENT_SUCCESS,
        DELETING_CLIENT, DELETE_CLIENT_SUCCESS } from '../Actions/actionTypes';

const initState = {
    clients : [],
    loading : false,
    error : false,
    success : { value : false, label : '' },
    currentPage : 1,
    loadClientLoader : false,
    updateClientLoader : false,
    deleteClientLoader : false
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
                            label : 'Record added successfully.'
                        },
                        error : false
                    }
          case UPDATING_CLIENT : {
                         return {
                             ...state,
                             updateClientLoader : true
                         }
                     }
          case UPDATE_CLIENT_SUCCESS : {
                         const index = state.clients.findIndex(client => client.id === action.id);
                         const newClients = [...state.clients];
                         action.data.id = action.id;
                         newClients[index] = action.data;
                         return {
                             ...state,
                             clients : [...newClients],
                             updateClientLoader : false,
                             success : {
                                ...state.success,
                                value : true,
                                label : 'Record updated successfully.'
                            }
                         }
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
          case DELETING_CLIENT : 
                        return {
                            ...state,
                            deleteClientLoader: true,
                        }      
          case DELETE_CLIENT_SUCCESS : 
                        const deleteIndex = state.clients.findIndex(client => client.id === action.id);
                        const newArr = [...state.clients];
                        newArr.splice(deleteIndex, 1);
                        return {
                            ...state,
                            deleteClientLoader : false, 
                            clients : [...newArr],
                            success : {
                                ...state.success,
                                value : true,
                                label : 'Record deleted successfully.'
                            }
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