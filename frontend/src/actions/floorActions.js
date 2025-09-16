import axios from 'axios';
import {
    CREATE_FLOOR,
    GET_ALL_FLOORS,
    UPDATE_FLOOR,
    DELETE_FLOOR,
    SEARCH_FLOORS
} from '../constants/floorConstants';


//Create an Floor FOR ADMIN ONLY
export const createFloor = (floorData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`http://127.0.0.1:8000/api/v1/admin/floor/create`, floorData, config)
        dispatch({
            type: CREATE_FLOOR,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

//Create an Floor FOR ADMIN ONLY
export const editFloor = (id,floorData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`http://127.0.0.1:8000/api/v1/admin/floor/update/${id}`, floorData, config)
        dispatch({
            type: UPDATE_FLOOR,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

export const deleteFloor = (id) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`http://127.0.0.1:8000/api/v1/admin/floor/delete/${id}`)
        dispatch({
            type: DELETE_FLOOR,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

// export const searchFloors = (searchTerm,orderBy) => async (dispatch) => {
//     try {
//         const { data } = await axios.get(`http://127.0.0.1:8000/api/v1/pcs/search?searchTerm=${searchTerm}&orderBy=${orderBy}`)
//         dispatch({
//             type: SEARCH_FloorS,
//             payload: data
//         })
//         return data.pcs
//     } catch (err) {
        
//         return { message: 'An error has occured' }
//     }

// };

export const getAllFloors = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://127.0.0.1:8000/api/v1/floors/all`)
        dispatch({
            type: GET_ALL_FLOORS,
            payload: data
        })
        return data.floors
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};