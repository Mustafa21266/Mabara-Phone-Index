import {
    CREATE_PC,
    GET_ALL_PCS,
    UPDATE_PC,
    DELETE_PC,
    SEARCH_PCS
} from "../constants/pcConstants";

const initialState = {
    pc: {},
    pcs: []
};

// return Object.assign({}, state, {
//     user: Object.assign({}, state.user, {
//         avatar: action.payload.avatar
//     }),
//     success: action.payload.success,
//     message: action.payload.message
// })

function pcReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_PC:
            return Object.assign({}, state, {
                pcs: state.pcs.concat(action.payload.pc),
                success: action.payload.success,
                message: action.payload.message
            })
        case UPDATE_PC:
            return Object.assign({}, state, {
                success: action.payload.success,
                message: action.payload.message,
                pcs: state.pcs.map(pc => {
                    if (pc._id === action.payload.pc._id) {
                        pc = action.payload.pc
                        return pc
                    }
                    return pc
                })
            })
        case DELETE_PC:
            return Object.assign({}, state, {
                pc: action.payload.pc,
                success: action.payload.success,
                message: action.payload.message,
                pcs: state.pcs.filter(pc => pc._id !== action.payload.pc._id)
            })
        case GET_ALL_PCS:
            return Object.assign({}, state, {
                pcs: action.payload.pcs
            })
        case SEARCH_PCS:
            return Object.assign({}, state, {
                success: action.payload.success,
                searchArticles: action.payload.pcs
            })
        default:
            return state;
    }

};

export default pcReducer;