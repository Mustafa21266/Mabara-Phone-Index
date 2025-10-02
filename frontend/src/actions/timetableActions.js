import axios from 'axios';
import {
    CREATE_TIMETABLE,
    GET_ALL_TIMETABLES,
    UPDATE_TIMETABLE,
    DELETE_TIMETABLE,
    SEARCH_TIMETABLES
} from '../constants/timetableConstants';
// axios.defaults.withCredentials = true;
import Cookies from 'js-cookie';
//Create an TimeTable FOR ADMIN ONLY
export const createTimeTable = (timetableData) => async (dispatch) => {
    try {
        const config = {
                            headers: {
                                'x-access-token': Cookies.get("token"),
                                'Content-Type': 'application/json'
                            }
                        }
        const { data } = await axios.post(`http://localhost:8000/api/v1/admin/timetable/create`, timetableData, config)
        dispatch({
            type: CREATE_TIMETABLE,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

//Create an TimeTable FOR ADMIN ONLY
export const editTimeTable = (id,timetableData) => async (dispatch) => {
    try {
        const config = {
                            headers: {
                                'x-access-token': Cookies.get("token"),
                                'Content-Type': 'application/json'
                            }
                        }
        const { data } = await axios.put(`http://localhost:8000/api/v1/admin/timetable/update/${id}`, timetableData, config)
        dispatch({
            type: UPDATE_TIMETABLE,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

export const deleteTimeTable = (id) => async (dispatch) => {
    try {
        const config = {
                            headers: {
                                'x-access-token': Cookies.get("token"),
                                'Content-Type': 'application/json'
                            }
                        }
        const { data } = await axios.delete(`http://localhost:8000/api/v1/admin/timetable/delete/${id}`, config)
        dispatch({
            type: DELETE_TIMETABLE,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

// export const searchTimeTables = (searchTerm,orderBy) => async (dispatch) => {
//     try {
//         const { data } = await axios.get(`http://localhost:8000/api/v1/pcs/search?searchTerm=${searchTerm}&orderBy=${orderBy}`)
//         dispatch({
//             type: SEARCH_TimeTableS,
//             payload: data
//         })
//         return data.pcs
//     } catch (err) {
        
//         return { message: 'An error has occured' }
//     }

// };

export const getAllTimeTables = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:8000/api/v1/timetables/all`)
        dispatch({
            type: GET_ALL_TIMETABLES,
            payload: data
        })
        return data.timetables
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};