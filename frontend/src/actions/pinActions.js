import axios from 'axios';
import {
    CREATE_PIN,
    GET_ALL_PINS,
    DELETE_PIN,
} from '../constants/pinConstants';


//Create an Pin FOR ADMIN ONLY
export const createPin = (pinData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`http://127.0.0.1:8000/api/v1/admin/pin/create`, pinData, config)
        dispatch({
            type: CREATE_PIN,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

export const deletePin = (id) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`http://127.0.0.1:8000/api/v1/admin/pin/delete/${id}`)
        dispatch({
            type: DELETE_PIN,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};


export const getAllPins = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://127.0.0.1:8000/api/v1/pins/all`)
        dispatch({
            type: GET_ALL_PINS,
            payload: data
        })
        return data.pins
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};