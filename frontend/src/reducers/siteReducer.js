import {
    CREATE_SITE,
    GET_ALL_SITES,
    UPDATE_SITE,
    DELETE_SITE,
    SEARCH_SITES
} from "../constants/siteConstants";

const initialState = {
    site: {},
    sites: []
};


function sitesReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_SITE:
            return Object.assign({}, state, {
                sites: state.sites.concat(action.payload.site),
                success: action.payload.success,
                message: action.payload.message
            })
        case UPDATE_SITE:
            return Object.assign({}, state, {
                success: action.payload.success,
                message: action.payload.message,
                sites: state.sites.map(site => {
                    if (site._id === action.payload.site._id) {
                        site = action.payload.site
                        return site
                    }
                    return site
                })
            })
        case DELETE_SITE:
            return Object.assign({}, state, {
                site: action.payload.site,
                success: action.payload.success,
                message: action.payload.message,
                sites: state.sites.filter(site => site._id !== action.payload.site._id)
            })
        case GET_ALL_SITES:
            return Object.assign({}, state, {
                sites: action.payload.sites
            })
        case SEARCH_SITES:
            return Object.assign({}, state, {
                success: action.payload.success,
                searchSites: action.payload.sites
            })
        default:
            return state;
    }

};

export default sitesReducer;