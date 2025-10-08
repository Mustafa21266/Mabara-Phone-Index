import {
    CREATE_TICKETHTML,
    GET_ALL_TICKETHTMLS,
    UPDATE_TICKETHTML,
    DELETE_TICKETHTML,
    SEARCH_TICKETHTMLS,
    CHANGE_TICKETHTML_STATUS
} from "../constants/ticketHTMLConstants";

const initialState = {
    ticketHTML: {},
    ticketHTMLs: []
};

// return Object.assign({}, state, {
//     user: Object.assign({}, state.user, {
//         avatar: action.payload.avatar
//     }),
//     success: action.payload.success,
//     message: action.payload.message
// })

function ticketHTMLReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_TICKETHTML:
            console.log(action.payload)
            return Object.assign({}, state, {
                ticketHTMLs: state.ticketHTMLs.concat(action.payload.ticketHTML),
                success: action.payload.success,
                message: action.payload.message
            })
        case UPDATE_TICKETHTML:
            return Object.assign({}, state, {
                success: action.payload.success,
                message: action.payload.message,
                ticketHTMLs: state.ticketHTMLs.map(ticketHTML => {
                    if (ticketHTML._id === action.payload.ticketHTML._id) {
                        ticketHTML = action.payload.ticketHTML
                        return ticketHTML
                    }
                    return ticketHTML
                })
            })
        case CHANGE_TICKETHTML_STATUS:
             return Object.assign({}, state, {
                success: action.payload.success,
                message: action.payload.message,
                ticketHTMLs: state.ticketHTMLs.map(ticketHTML => {
                    if (ticketHTML._id === action.payload.ticketHTML._id) {
                        ticketHTML = action.payload.ticketHTML
                        return ticketHTML
                    }
                    return ticketHTML
                })
            })
        case DELETE_TICKETHTML:
            return Object.assign({}, state, {
                ticketHTML: action.payload.ticketHTML,
                success: action.payload.success,
                message: action.payload.message,
                ticketHTMLs: state.ticketHTMLs.filter(ticketHTML => ticketHTML._id !== action.payload.ticketHTML._id)
            })
        case GET_ALL_TICKETHTMLS:
            return Object.assign({}, state, {
                ticketHTMLs: action.payload.ticketHTMLs
            })
        case SEARCH_TICKETHTMLS:
            return Object.assign({}, state, {
                success: action.payload.success,
                searchTicketHTMLs: action.payload.ticketHTMLs
            })
        default:
            return state;
    }

};

export default ticketHTMLReducer;