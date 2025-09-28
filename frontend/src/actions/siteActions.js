import axios from 'axios';
import {
    CREATE_SITE,
    GET_ALL_SITES,
    UPDATE_SITE,
    DELETE_SITE,
    SEARCH_SITES
} from '../constants/siteConstants';
// axios.defaults.withCredentials = true;

//Create an Site FOR ADMIN ONLY
export const createSite = (siteData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`http://localhost:8000/api/v1/admin/site/create`, siteData, config)
        dispatch({
            type: CREATE_SITE,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

//Create an Site FOR ADMIN ONLY
export const editSite = (id,siteData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`http://localhost:8000/api/v1/admin/site/update/${id}`, siteData, config)
        dispatch({
            type: UPDATE_SITE,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

export const deleteSite = (id) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`http://localhost:8000/api/v1/admin/site/delete/${id}`)
        dispatch({
            type: DELETE_SITE,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

// export const searchSites = (searchTerm,orderBy) => async (dispatch) => {
//     try {
//         const { data } = await axios.get(`http://localhost:8000/api/v1/pcs/search?searchTerm=${searchTerm}&orderBy=${orderBy}`)
//         dispatch({
//             type: SEARCH_SiteS,
//             payload: data
//         })
//         return data.pcs
//     } catch (err) {
        
//         return { message: 'An error has occured' }
//     }

// };

export const getAllSites = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:8000/api/v1/sites/all`)
        dispatch({
            type: GET_ALL_SITES,
            payload: data
        })
        return data.sites
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};