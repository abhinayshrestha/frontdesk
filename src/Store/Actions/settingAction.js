import { UPDATING_INPUT_SETTING, UPDATING_INPUT_SETTING_SUCCESS, ADD_TEMPLATE_SUCCESS, UPDATE_TEMPLATE_SUCCESS, 
        DELETE_TEMPLATE_SUCCESS } from './actionTypes';

const updatingInputSetting = () => {
    return {
        type: UPDATING_INPUT_SETTING
    }
}

const updatingInputSettingSuccess = data => {
    return {
        type: UPDATING_INPUT_SETTING_SUCCESS,
        data : data
    }
}

export const updatingInput = data => {
     return dispatch => {
         dispatch(updatingInputSetting());
         setTimeout(() => {
            dispatch(updatingInputSettingSuccess(data));
         },2000)
     }   
}

const addTemplateSuccess = data => {
    return {
        type : ADD_TEMPLATE_SUCCESS,
        data : data
    }
}

export const addTemplate = data => {
    return dispatch => {
        dispatch(addTemplateSuccess(data))
    }
}

const updateTemplateSuccess = data => {
    return {
        type : UPDATE_TEMPLATE_SUCCESS,
        data : data
    }
}
export const updateTemplate = data => {
        return dispatch => {
            dispatch(updateTemplateSuccess(data));
        } 
}

const deleteTemplateSuccess = data => {
    return {
        type : DELETE_TEMPLATE_SUCCESS,
        data : data    
    }
}

export const deleteTemplate = data => {
    return dispatch => {
        dispatch(deleteTemplateSuccess(data));
    }
}