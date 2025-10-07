import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from './reducers/userReducer';
import articleReducer from './reducers/articleReducer';
import floorReducer from './reducers/floorReducer';
import sitesReducer from './reducers/siteReducer';
import departmentsReducer from './reducers/departmentReducer';
import timetablesReducer from './reducers/timetableReducer';
import tabledaysReducer from './reducers/tabledayReducer';
import extensionReducer from './reducers/extensionReducer';
import pinReducer from './reducers/pinReducer';
import ticketReducer from './reducers/ticketReducer';
const reducer = combineReducers({
    auth: userReducer,
    article: articleReducer,
    floor: floorReducer,
    extension: extensionReducer,
    pin: pinReducer,
    site: sitesReducer,
    department: departmentsReducer,
    timetable: timetablesReducer,
    tableday: tabledaysReducer,
    ticket: ticketReducer
})

let initialState = {

}
// , composeWithDevTools(applyMiddleware(...middleware))
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;