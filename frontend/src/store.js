import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from './reducers/userReducer';
import articleReducer from './reducers/articleReducer';
import floorReducer from './reducers/floorReducer';
import sitesReducer from './reducers/siteReducer';
import extensionReducer from './reducers/extensionReducer';
const reducer = combineReducers({
    auth: userReducer,
    article: articleReducer,
    floor: floorReducer,
    extension: extensionReducer,
    site: sitesReducer
})

let initialState = {

}
// , composeWithDevTools(applyMiddleware(...middleware))
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;