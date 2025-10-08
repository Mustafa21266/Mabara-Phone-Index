import {
    CREATE_TICKET,
    GET_ALL_TICKETS,
    UPDATE_TICKET,
    DELETE_TICKET,
    SEARCH_TICKETS,
    CHANGE_TICKET_STATUS,
    CHANGE_TICKET_ASSIGNED
} from "../constants/ticketConstants";

const initialState = {
    ticket: {},
    tickets: []
};

// return Object.assign({}, state, {
//     user: Object.assign({}, state.user, {
//         avatar: action.payload.avatar
//     }),
//     success: action.payload.success,
//     message: action.payload.message
// })

function ticketReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_TICKET:
            return Object.assign({}, state, {
                tickets: state.tickets.concat(action.payload.ticket),
                success: action.payload.success,
                message: action.payload.message
            })
        case UPDATE_TICKET:
            return Object.assign({}, state, {
                success: action.payload.success,
                message: action.payload.message,
                tickets: state.tickets.map(ticket => {
                    if (ticket._id === action.payload.ticket._id) {
                        ticket = action.payload.ticket
                        return ticket
                    }
                    return ticket
                })
            })
        case CHANGE_TICKET_STATUS:
             return Object.assign({}, state, {
                success: action.payload.success,
                message: action.payload.message,
                tickets: state.tickets.map(ticket => {
                    if (ticket._id === action.payload.ticket._id) {
                        ticket = action.payload.ticket
                        return ticket
                    }
                    return ticket
                })
            })
        case CHANGE_TICKET_ASSIGNED:
             return Object.assign({}, state, {
                success: action.payload.success,
                message: action.payload.message,
                tickets: state.tickets.map(ticket => {
                    if (ticket._id === action.payload.ticket._id) {
                        ticket = action.payload.ticket
                        return ticket
                    }
                    return ticket
                })
            })
        case DELETE_TICKET:
            return Object.assign({}, state, {
                ticket: action.payload.ticket,
                success: action.payload.success,
                message: action.payload.message,
                tickets: state.tickets.filter(ticket => ticket._id !== action.payload.ticket._id)
            })
        case GET_ALL_TICKETS:
            return Object.assign({}, state, {
                tickets: action.payload.tickets
            })
        case SEARCH_TICKETS:
            return Object.assign({}, state, {
                success: action.payload.success,
                searchTickets: action.payload.tickets
            })
        default:
            return state;
    }

};

export default ticketReducer;