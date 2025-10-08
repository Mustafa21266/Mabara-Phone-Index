import axios from 'axios';
import {
    CREATE_TICKET,
    GET_ALL_TICKETS,
    UPDATE_TICKET,
    DELETE_TICKET,
    SEARCH_TICKETS,
    CHANGE_TICKET_STATUS,
    CHANGE_TICKET_ASSIGNED
} from '../constants/ticketConstants';
// axios.defaults.withCredentials = true;
import Cookies from 'js-cookie';
//Create an Ticket FOR ADMIN ONLY
export const createTicket = (ticketData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'x-access-token': Cookies.get("token"),
                                                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`http://localhost:8000/api/v1/admin/ticket/create`, ticketData, config)
        dispatch({
            type: CREATE_TICKET,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

//Create an Ticket FOR ADMIN ONLY
export const editTicket = (id,ticketData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'x-access-token': Cookies.get("token"),
                                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`http://localhost:8000/api/v1/admin/ticket/update/${id}`, ticketData, config)
        dispatch({
            type: UPDATE_TICKET,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

//Create an Ticket FOR ADMIN ONLY
export const changeTicketStatus = (id,ticketData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'x-access-token': Cookies.get("token"),
                                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`http://localhost:8000/api/v1/admin/ticket/status/change/${id}`, ticketData, config)
        dispatch({
            type: CHANGE_TICKET_STATUS,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

//Create an Ticket FOR ADMIN ONLY
export const changeTicketAssigned = (id,ticketData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'x-access-token': Cookies.get("token"),
                                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`http://localhost:8000/api/v1/admin/ticket/assigned/change/${id}`, ticketData, config)
        dispatch({
            type: CHANGE_TICKET_ASSIGNED,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

export const deleteTicket = (id) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`http://localhost:8000/api/v1/admin/ticket/delete/${id}`)
        dispatch({
            type: DELETE_TICKET,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

export const searchTickets = (searchTerm,orderBy) => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:8000/api/v1/tickets/search?searchTerm=${searchTerm}&orderBy=${orderBy}`)
        dispatch({
            type: SEARCH_TICKETS,
            payload: data
        })
        return data.tickets
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

export const getAllTickets = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:8000/api/v1/tickets/all`)
        dispatch({
            type: GET_ALL_TICKETS,
            payload: data
        })
        return data.tickets
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};