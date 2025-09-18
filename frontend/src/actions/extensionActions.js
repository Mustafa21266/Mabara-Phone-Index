import axios from 'axios';
import {
    CREATE_EXTENSION,
    GET_ALL_EXTENSIONS,
    UPDATE_EXTENSION,
    DELETE_EXTENSION,
    SEARCH_EXTENSIONS
} from '../constants/extensionConstants';


//Create an Extension FOR ADMIN ONLY
export const createExtension = (extensionData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`http://127.0.0.1:8000/api/v1/admin/extension/create`, extensionData, config)
        dispatch({
            type: CREATE_EXTENSION,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

//Create an Extension FOR ADMIN ONLY
export const editExtension = (id,extensionData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`http://127.0.0.1:8000/api/v1/admin/extension/update/${id}`, extensionData, config)
        dispatch({
            type: UPDATE_EXTENSION,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

export const deleteExtension = (id) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`http://127.0.0.1:8000/api/v1/admin/extension/delete/${id}`)
        dispatch({
            type: DELETE_EXTENSION,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

// export const searchExtensions = (searchTerm,orderBy) => async (dispatch) => {
//     try {
//         const { data } = await axios.get(`http://127.0.0.1:8000/api/v1/pcs/search?searchTerm=${searchTerm}&orderBy=${orderBy}`)
//         dispatch({
//             type: SEARCH_ExtensionS,
//             payload: data
//         })
//         return data.pcs
//     } catch (err) {
        
//         return { message: 'An error has occured' }
//     }

// };

export const getAllExtensions = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://127.0.0.1:8000/api/v1/extensions/all`)
        dispatch({
            type: GET_ALL_EXTENSIONS,
            payload: data
        })
        return data.extensions
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};