import axios from 'axios';
import {
    CREATE_TICKETHTML,
    GET_ALL_TICKETHTMLS,
    UPDATE_TICKETHTML,
    DELETE_TICKETHTML,
    SEARCH_TICKETHTMLS,
    CHANGE_TICKETHTML_STATUS
} from '../constants/ticketHTMLConstants';
// axios.defaults.withCredentials = true;
import Cookies from 'js-cookie';
//Create an TicketHTML FOR ADMIN ONLY
export const createTicketHTML = (ticketHTMLData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'x-access-token': Cookies.get("token"),
                                                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`http://localhost:8000/api/v1/admin/ticketHTML/create`, ticketHTMLData, config)
        dispatch({
            type: CREATE_TICKETHTML,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

//Create an TicketHTML FOR ADMIN ONLY
export const editTicketHTML = (id,ticketHTMLData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'x-access-token': Cookies.get("token"),
                                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`http://localhost:8000/api/v1/admin/ticketHTML/update/${id}`, ticketHTMLData, config)
        dispatch({
            type: UPDATE_TICKETHTML,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

//Create an TicketHTML FOR ADMIN ONLY
export const changeTicketHTMLStatus = (id,ticketHTMLData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'x-access-token': Cookies.get("token"),
                                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`http://localhost:8000/api/v1/admin/ticketHTML/status/change/${id}`, ticketHTMLData, config)
        dispatch({
            type: CHANGE_TICKETHTML_STATUS,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

export const deleteTicketHTML = (id) => async (dispatch) => {
    try {
                const config = {
                                    headers: {
                                        'x-access-token': Cookies.get("token"),
                                        'Content-Type': 'application/json'
                                    }
                                }
        const { data } = await axios.delete(`http://localhost:8000/api/v1/admin/ticketHTML/delete/${id}`, config)
        dispatch({
            type: DELETE_TICKETHTML,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

export const searchTicketHTMLs = (searchTerm,orderBy) => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:8000/api/v1/ticketHTMLs/search?searchTerm=${searchTerm}&orderBy=${orderBy}`)
        dispatch({
            type: SEARCH_TICKETHTMLS,
            payload: data
        })
        return data.ticketHTMLs
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

export const getAllTicketHTMLs = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:8000/api/v1/ticketHTMLs/all`)
        dispatch({
            type: GET_ALL_TICKETHTMLS,
            payload: data
        })
        return data.ticketHTMLs
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};