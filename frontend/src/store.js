import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from './reducers/userReducer';
import articleReducer from './reducers/articleReducer';
import pcReducer from './reducers/pcReducer';
import sitesReducer from './reducers/siteReducer';
const reducer = combineReducers({
    auth: userReducer,
    article: articleReducer,
    pc: pcReducer,
    site: sitesReducer
})

let initialState = {

}
// , composeWithDevTools(applyMiddleware(...middleware))
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;