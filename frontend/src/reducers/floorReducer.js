import {
    CREATE_FLOOR,
    GET_ALL_FLOORS,
    UPDATE_FLOOR,
    DELETE_FLOOR,
    SEARCH_FLOORS
} from "../constants/floorConstants";

const initialState = {
    floor: {},
    floors: []
};

// return Object.assign({}, state, {
//     user: Object.assign({}, state.user, {
//         avatar: action.payload.avatar
//     }),
//     success: action.payload.success,
//     message: action.payload.message
// })

function floorReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_FLOOR:
            return Object.assign({}, state, {
                floors: state.floors.concat(action.payload.floor),
                success: action.payload.success,
                message: action.payload.message
            })
        case UPDATE_FLOOR:
            return Object.assign({}, state, {
                success: action.payload.success,
                message: action.payload.message,
                floors: state.floors.map(floor => {
                    if (floor._id === action.payload.floor._id) {
                        floor = action.payload.floor
                        return floor
                    }
                    return floor
                })
            })
        case DELETE_FLOOR:
            return Object.assign({}, state, {
                floor: action.payload.floor,
                success: action.payload.success,
                message: action.payload.message,
                floors: state.floors.filter(floor => floor._id !== action.payload.floor._id)
            })
        case GET_ALL_FLOORS:
            return Object.assign({}, state, {
                floors: action.payload.floors
            })
        case SEARCH_FLOORS:
            return Object.assign({}, state, {
                success: action.payload.success,
                searchArticles: action.payload.floors
            })
        default:
            return state;
    }

};

export default floorReducer;