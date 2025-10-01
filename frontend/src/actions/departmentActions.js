import axios from 'axios';
import {
    CREATE_DEPARTMENT,
    GET_ALL_DEPARTMENTS,
    UPDATE_DEPARTMENT,
    DELETE_DEPARTMENT,
    SEARCH_DEPARTMENTS
} from '../constants/departmentConstants';
// axios.defaults.withCredentials = true;
import Cookies from 'js-cookie';
//Create an Department FOR ADMIN ONLY
export const createDepartment = (departmentData) => async (dispatch) => {
    try {
        const config = {
                            headers: {
                                'x-access-token': Cookies.get("token"),
                                'Content-Type': 'application/json'
                            }
                        }
        const { data } = await axios.post(`http://localhost:8000/api/v1/admin/department/create`, departmentData, config)
        dispatch({
            type: CREATE_DEPARTMENT,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

//Create an Department FOR ADMIN ONLY
export const editDepartment = (id,departmentData) => async (dispatch) => {
    try {
        const config = {
                            headers: {
                                'x-access-token': Cookies.get("token"),
                                'Content-Type': 'application/json'
                            }
                        }
        const { data } = await axios.put(`http://localhost:8000/api/v1/admin/department/update/${id}`, departmentData, config)
        dispatch({
            type: UPDATE_DEPARTMENT,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

export const deleteDepartment = (id) => async (dispatch) => {
    try {
        const config = {
                            headers: {
                                'x-access-token': Cookies.get("token"),
                                'Content-Type': 'application/json'
                            }
                        }
        const { data } = await axios.delete(`http://localhost:8000/api/v1/admin/department/delete/${id}`, config)
        dispatch({
            type: DELETE_DEPARTMENT,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

// export const searchDepartments = (searchTerm,orderBy) => async (dispatch) => {
//     try {
//         const { data } = await axios.get(`http://localhost:8000/api/v1/pcs/search?searchTerm=${searchTerm}&orderBy=${orderBy}`)
//         dispatch({
//             type: SEARCH_DepartmentS,
//             payload: data
//         })
//         return data.pcs
//     } catch (err) {
        
//         return { message: 'An error has occured' }
//     }

// };

export const getAllDepartments = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:8000/api/v1/departments/all`)
        dispatch({
            type: GET_ALL_DEPARTMENTS,
            payload: data
        })
        return data.departments
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};