import { combineReducers } from 'redux';
import authReducer from './authReducer';
import manageClientReducer from './manageClientReducer';
import settingReducer from './settingReducer';

const rootReducer = combineReducers({
    authReducer,
    manageClientReducer,
    settingReducer
})

export default rootReducer;