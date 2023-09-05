import { combineReducers } from 'redux';
import dashboardReducer from './reducers/dashboardReducer';
import callReducer from './reducers/callReducers';

export default combineReducers({
    dashboard: dashboardReducer,
    call: callReducer
});