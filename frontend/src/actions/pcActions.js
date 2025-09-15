import axios from 'axios';
import {
    CREATE_PC,
    GET_ALL_PCS,
    UPDATE_PC,
    DELETE_PC,
    SEARCH_PCS
} from '../constants/pcConstants';


//Create an PC FOR ADMIN ONLY
export const createPC = (pcData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`http://127.0.0.1:8000/api/v1/admin/pc/create`, pcData, config)
        dispatch({
            type: CREATE_PC,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

//Create an PC FOR ADMIN ONLY
export const editPC = (id,pcData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`http://127.0.0.1:8000/api/v1/admin/pc/update/${id}`, pcData, config)
        dispatch({
            type: UPDATE_PC,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

export const deletePC = (id) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`http://127.0.0.1:8000/api/v1/admin/pc/delete/${id}`)
        dispatch({
            type: DELETE_PC,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

export const searchPCs = (searchTerm,orderBy) => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://127.0.0.1:8000/api/v1/pcs/search?searchTerm=${searchTerm}&orderBy=${orderBy}`)
        dispatch({
            type: SEARCH_PCS,
            payload: data
        })
        return data.pcs
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

export const getAllPCs = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://127.0.0.1:8000/api/v1/pcs/all`)
        dispatch({
            type: GET_ALL_PCS,
            payload: data
        })
        return data.pcs
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};