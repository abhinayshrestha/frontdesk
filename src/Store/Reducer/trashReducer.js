import { LOADING_TRASH, LOADING_TRASH_SUCCESS, DELETING_FROM_TRASH, DELETING_FROM_TRASH_SUCCESS, SET_TRASH_ACTION, LOAD_TRASH_TOTAL_PAGE } from '../Actions/actionTypes';

const initState = {
    trashData : [],
    loadingTrash : false,
    deletingTrash : false,
    trashActionSuccess : { value : false, label : '' },
    totalPage : 0
}

const trashReducer = (state = initState, action) => {
    switch(action.type) {
      case  LOADING_TRASH : return {
                    ...state,
                    loadingTrash : true,
                }
      case LOADING_TRASH_SUCCESS :  return {
                ...state,
                loadingTrash : false,
                trashData : [...action.data]
            }
      case DELETING_FROM_TRASH : return {
                ...state,
                deletingTrash : true,
            }
       case DELETING_FROM_TRASH_SUCCESS : 
                let newArr = [...state.trashData]  
                newArr = newArr.filter(function(obj) {
                    return !this.has(obj.id);
                }, new Set(action.id.map(id => id)));
                return {
                        ...state,
                        trashData : [...newArr],
                        deletingTrash : false,
                        trashActionSuccess : {
                            ...state.trashActionSuccess,
                            value : true,
                            label : 'Records has been deleted permanently'
                        }
                    }  
        case LOAD_TRASH_TOTAL_PAGE :
                    return {
                        ...state,
                        totalPage : action.page
                    }
        case SET_TRASH_ACTION :
                return {
                    ...state,
                    trashActionSuccess : {
                        ...state.trashActionSuccess,
                        value : false,
                    }
                }
      default : return state;
    }
}

export default trashReducer;