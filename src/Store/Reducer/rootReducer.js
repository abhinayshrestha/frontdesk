import { combineReducers } from 'redux';
import authReducer from './authReducer';
import manageClientReducer from './manageClientReducer';
import settingReducer from './settingReducer';
import dashboardReducer from './dashboardReducer';

const rootReducer = combineReducers({
    authReducer,
    manageClientReducer,
    settingReducer,
    dashboardReducer
})

export default rootReducer;