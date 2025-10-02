import {
    CREATE_TIMETABLE,
    GET_ALL_TIMETABLES,
    UPDATE_TIMETABLE,
    DELETE_TIMETABLE,
    SEARCH_TIMETABLES
} from "../constants/timetableConstants";

const initialState = {
    timetable: {},
    timetables: []
};


function timetablesReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_TIMETABLE:
            return Object.assign({}, state, {
                timetables: state.timetables.concat(action.payload.timetable),
                success: action.payload.success,
                message: action.payload.message
            })
        case UPDATE_TIMETABLE:
            return Object.assign({}, state, {
                success: action.payload.success,
                message: action.payload.message,
                timetables: state.timetables.map(timetable => {
                    if (timetable._id === action.payload.timetable._id) {
                        timetable = action.payload.timetable
                        return timetable
                    }
                    return timetable
                })
            })
        case DELETE_TIMETABLE:
            return Object.assign({}, state, {
                timetable: action.payload.timetable,
                success: action.payload.success,
                message: action.payload.message,
                timetables: state.timetables.filter(timetable => timetable._id !== action.payload.timetable._id)
            })
        case GET_ALL_TIMETABLES:
            return Object.assign({}, state, {
                timetables: action.payload.timetables
            })
        case SEARCH_TIMETABLES:
            return Object.assign({}, state, {
                success: action.payload.success,
                searchTimeTables: action.payload.timetables
            })
        default:
            return state;
    }

};

export default timetablesReducer;