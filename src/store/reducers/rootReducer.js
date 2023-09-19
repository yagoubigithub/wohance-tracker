
import {    combineReducers } from 'redux';

import timerReducer from  "./TimerReducer"
import userReducer from  "./userReducer"
import employeeReducer from  "./employeeReducer"
import projectReducer from  "./projectReducer"

const rootReducer  = combineReducers({
 timer : timerReducer,
 employee : employeeReducer,
 user : userReducer,
 project : projectReducer
    
});

export default rootReducer;