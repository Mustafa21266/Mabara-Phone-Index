import axios from 'axios';
import {
    CREATE_PIN,
    GET_ALL_PINS,
    DELETE_PIN,
} from '../constants/pinConstants';
// axios.defaults.withCredentials = true;

//Create an Pin FOR ADMIN ONLY
export const createPin = (pinData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`http://localhost:8000/api/v1/admin/pin/create`, pinData, config)
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
        const { data } = await axios.delete(`http://localhost:8000/api/v1/admin/pin/delete/${id}`)
        dispatch({
            type: DELETE_PIN,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};


export const getAllPins = (token) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'x-access-token': token,
                'Access-Control-Allow-Headers': '*'
            }
        }
        const { data } = await axios.get(`http://localhost:8000/api/v1/pins/${token}`,config)
        dispatch({
            type: GET_ALL_PINS,
            payload: data
        })
        return data.pins
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};