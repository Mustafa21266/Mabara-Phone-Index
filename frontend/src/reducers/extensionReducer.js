import {
    CREATE_EXTENSION,
    GET_ALL_EXTENSIONS,
    UPDATE_EXTENSION,
    DELETE_EXTENSION,
    SEARCH_EXTENSIONS
} from "../constants/extensionConstants";

const initialState = {
    extension: {},
    extensions: []
};

// return Object.assign({}, state, {
//     user: Object.assign({}, state.user, {
//         avatar: action.payload.avatar
//     }),
//     success: action.payload.success,
//     message: action.payload.message
// })

function extensionReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_EXTENSION:
            return Object.assign({}, state, {
                extensions: state.extensions.concat(action.payload.extension),
                success: action.payload.success,
                message: action.payload.message
            })
        case UPDATE_EXTENSION:
            return Object.assign({}, state, {
                success: action.payload.success,
                message: action.payload.message,
                extensions: state.extensions.map(extension => {
                    if (extension._id === action.payload.extension._id) {
                        extension = action.payload.extension
                        return extension
                    }
                    return extension
                })
            })
        case DELETE_EXTENSION:
            return Object.assign({}, state, {
                extension: action.payload.extension,
                success: action.payload.success,
                message: action.payload.message,
                extensions: state.extensions.filter(extension => extension._id !== action.payload.extension._id)
            })
        case GET_ALL_EXTENSIONS:
            return Object.assign({}, state, {
                extensions: action.payload.extensions
            })
        case SEARCH_EXTENSIONS:
            return Object.assign({}, state, {
                success: action.payload.success,
                searchArticles: action.payload.extensions
            })
        default:
            return state;
    }

};

export default extensionReducer;