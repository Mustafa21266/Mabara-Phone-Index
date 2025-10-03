import {
    CREATE_TABLEDAY,
    GET_ALL_TABLEDAYS,
    UPDATE_TABLEDAY,
    DELETE_TABLEDAY,
    SEARCH_TABLEDAYS
} from "../constants/tabledayConstants";

const initialState = {
    tableday: {},
    tabledays: []
};


function tabledaysReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_TABLEDAY:
            return Object.assign({}, state, {
                tabledays: state.tabledays.concat(action.payload.tableday),
                success: action.payload.success,
                message: action.payload.message
            })
        case UPDATE_TABLEDAY:
            return Object.assign({}, state, {
                success: action.payload.success,
                message: action.payload.message,
                tabledays: state.tabledays.map(tableday => {
                    if (tableday._id === action.payload.tableday._id) {
                        tableday = action.payload.tableday
                        return tableday
                    }
                    return tableday
                })
            })
        case DELETE_TABLEDAY:
            return Object.assign({}, state, {
                tableday: action.payload.tableday,
                success: action.payload.success,
                message: action.payload.message,
                tabledays: state.tabledays.filter(tableday => tableday._id !== action.payload.tableday._id)
            })
        case GET_ALL_TABLEDAYS:
            return Object.assign({}, state, {
                tabledays: action.payload.tabledays
            })
        case SEARCH_TABLEDAYS:
            return Object.assign({}, state, {
                success: action.payload.success,
                searchTableDays: action.payload.tabledays
            })
        default:
            return state;
    }

};

export default tabledaysReducer;