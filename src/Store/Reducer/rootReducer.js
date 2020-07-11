import { combineReducers } from 'redux';
import authReducer from './authReducer';
import manageClientReducer from './manageClientReducer';
import settingReducer from './settingReducer';
import dashboardReducer from './dashboardReducer';
import trashReducer from './trashReducer';

const rootReducer = combineReducers({
    authReducer,
    manageClientReducer,
    settingReducer,
    dashboardReducer,
    trashReducer
})

export default rootReducer;