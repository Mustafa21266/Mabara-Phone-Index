import {
    CREATE_DEPARTMENT,
    GET_ALL_DEPARTMENTS,
    UPDATE_DEPARTMENT,
    DELETE_DEPARTMENT,
    SEARCH_DEPARTMENTS
} from "../constants/departmentConstants";

const initialState = {
    department: {},
    departments: []
};


function departmentsReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_DEPARTMENT:
            return Object.assign({}, state, {
                departments: state.departments.concat(action.payload.department),
                success: action.payload.success,
                message: action.payload.message
            })
        case UPDATE_DEPARTMENT:
            return Object.assign({}, state, {
                success: action.payload.success,
                message: action.payload.message,
                departments: state.departments.map(department => {
                    if (department._id === action.payload.department._id) {
                        department = action.payload.department
                        return department
                    }
                    return department
                })
            })
        case DELETE_DEPARTMENT:
            return Object.assign({}, state, {
                department: action.payload.department,
                success: action.payload.success,
                message: action.payload.message,
                departments: state.departments.filter(department => department._id !== action.payload.department._id)
            })
        case GET_ALL_DEPARTMENTS:
            return Object.assign({}, state, {
                departments: action.payload.departments
            })
        case SEARCH_DEPARTMENTS:
            return Object.assign({}, state, {
                success: action.payload.success,
                searchDepartments: action.payload.departments
            })
        default:
            return state;
    }

};

export default departmentsReducer;