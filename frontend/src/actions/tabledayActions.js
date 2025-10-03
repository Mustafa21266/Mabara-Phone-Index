import axios from 'axios';
import {
    CREATE_TABLEDAY,
    GET_ALL_TABLEDAYS,
    UPDATE_TABLEDAY,
    DELETE_TABLEDAY,
    SEARCH_TABLEDAYS
} from '../constants/tabledayConstants';
// axios.defaults.withCredentials = true;
import Cookies from 'js-cookie';
//Create an TableDay FOR ADMIN ONLY
export const createTableDay = (tabledayData) => async (dispatch) => {
    try {
        const config = {
                            headers: {
                                'x-access-token': Cookies.get("token"),
                                'Content-Type': 'application/json'
                            }
                        }
        const { data } = await axios.post(`http://localhost:8000/api/v1/admin/tableday/create`, tabledayData, config)
        dispatch({
            type: CREATE_TABLEDAY,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

//Create an TableDay FOR ADMIN ONLY
export const editTableDay = (id,tabledayData) => async (dispatch) => {
    try {
        const config = {
                            headers: {
                                'x-access-token': Cookies.get("token"),
                                'Content-Type': 'application/json'
                            }
                        }
        const { data } = await axios.put(`http://localhost:8000/api/v1/admin/tableday/update/${id}`, tabledayData, config)
        dispatch({
            type: UPDATE_TABLEDAY,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

export const deleteTableDay = (id) => async (dispatch) => {
    try {
        const config = {
                            headers: {
                                'x-access-token': Cookies.get("token"),
                                'Content-Type': 'application/json'
                            }
                        }
        const { data } = await axios.delete(`http://localhost:8000/api/v1/admin/tableday/delete/${id}`, config)
        dispatch({
            type: DELETE_TABLEDAY,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

// export const searchTableDays = (searchTerm,orderBy) => async (dispatch) => {
//     try {
//         const { data } = await axios.get(`http://localhost:8000/api/v1/pcs/search?searchTerm=${searchTerm}&orderBy=${orderBy}`)
//         dispatch({
//             type: SEARCH_TableDayS,
//             payload: data
//         })
//         return data.pcs
//     } catch (err) {
        
//         return { message: 'An error has occured' }
//     }

// };

export const getAllTableDays = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:8000/api/v1/tabledays/all`)
        dispatch({
            type: GET_ALL_TABLEDAYS,
            payload: data
        })
        return data.tabledays
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};