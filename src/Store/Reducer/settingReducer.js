import { UPDATING_INPUT_SETTING_SUCCESS, UPDATING_INPUT_SETTING, ADD_TEMPLATE_SUCCESS, UPDATE_TEMPLATE_SUCCESS,
         DELETE_TEMPLATE_SUCCESS } from '../Actions/actionTypes';

const initState =  {
    entryForm : {
        name : { label: 'Name', value: '' , options: false, checked: true, error: false, errMsg: 'Enter atleast a character' },
        academic :  { label: 'Academic', value: '' , options: ['Masters','Bachelor','High School','SLC'], checked: true, error: false, errMsg: 'Enter academic qualification' },
        status : { label: 'Status', value: '' , options: ['Booked','Pending','Cancelled','Others'], checked: true, error: false, errMsg: 'Enter a status' },
        email : { label: 'Email', value: '' , options: false, checked: true, error: false, errMsg: 'Enter valid email address' },
        phone : { label: 'Phone no.', value: '' , options: false, checked: true, error: false, errMsg: 'Enter valid phone number' },
        weight : { label: 'Weight', value: '' , options: [50, 60, 80], checked: false, error: false, errMsg: 'Enter weight' },
        address : { label: 'Address', value: '' , options: false, checked: true, error: false, errMsg: 'Enter an address' },
        age :  { label: 'Age', value: '' , options: [15, 16, 17], checked: true, error: false, errMsg: 'Enter a age' },
        date : { label: 'Date', value: new Date() , options: false, checked: true, error: false, errMsg: 'Enter a date' },
        remark : { label: 'Remark', value: '' , options: false, checked: true, error: false, errMsg: 'Enter remarks' },
        height : { label: 'Height', value: '' , options: [5.1, 5.2, 5.3], checked: true, error: false, errMsg: 'Enter height' },
        gender : { label: 'Gender', value: '' , options: ['Male', 'Female','Others'], checked: true, error: false, errMsg: 'Enter gender' },
        martial : { label: 'Martial Status', value: '' , options: ['Single','Married','Others'], checked: true, error: false, errMsg: 'Enter martial status' }
    },
    saveEntryLoader : false,
    templateMsg : [
        'Can I call you few Moments Later???',
        'We request you to join our orientation programme on ' + new Date(),
        'There can only be one winner Let\'s go'
    ]
}

const settingReducer = (state = initState, action) => {
    switch(action.type){
        case UPDATING_INPUT_SETTING : 
                                return {
                                    ...state,
                                    saveEntryLoader: true
                                }
        case UPDATING_INPUT_SETTING_SUCCESS :   
                                  return {
                                      ...state,
                                      entryForm : {...action.data},
                                      saveEntryLoader: false
                                  }  
        case ADD_TEMPLATE_SUCCESS : 
                                return {
                                    ...state,
                                    templateMsg : state.templateMsg.concat(action.data)
                                }                 
        case UPDATE_TEMPLATE_SUCCESS : 
                                const newTemplates = [...state.templateMsg];
                                newTemplates[action.data.index] = action.data.val;
                                 return {
                                     ...state,
                                     templateMsg : newTemplates
                                 }                         
        case DELETE_TEMPLATE_SUCCESS : 
                                let deleteTemplates = [...state.templateMsg];
                                deleteTemplates.splice(action.data,1);
                                return {
                                    ...state,
                                    templateMsg : deleteTemplates
                                }                         
        default : return state;
    }
}

export default settingReducer;