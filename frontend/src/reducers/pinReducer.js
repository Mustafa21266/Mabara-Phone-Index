import {
    CREATE_PIN,
    GET_ALL_PINS,
    DELETE_PIN,
} from "../constants/pinConstants";

const initialState = {
    pin: {},
    pins: []
};

// return Object.assign({}, state, {
//     user: Object.assign({}, state.user, {
//         avatar: action.payload.avatar
//     }),
//     success: action.payload.success,
//     message: action.payload.message
// })

function pinReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_PIN:
            return Object.assign({}, state, {
                pins: state.pins.concat(action.payload.pin),
                success: action.payload.success,
                message: action.payload.message
            })
        case DELETE_PIN:
            return Object.assign({}, state, {
                pin: action.payload.pin,
                success: action.payload.success,
                message: action.payload.message,
                pins: state.pins.filter(pin => pin._id !== action.payload.pin._id)
            })
        case GET_ALL_PINS:
            return Object.assign({}, state, {
                pins: action.payload.pins
            })
        default:
            return state;
    }

};

export default pinReducer;