import axios from 'axios';
import {
    REGISTER,
    LOGIN_ADMIN,
    LOGOUT_ADMIN,
    EDIT_PROFILE,
    GET_USER_DETAILS,
    GET_ALL_USERS,
    EDIT_PROFILE_ADMIN,
    DELETE_USER_ADMIN,
    FORGOT_PASSWORD,
    RESET_PASSWORD
} from '../constants/adminConstants';
let baseURL = '';

//REGISTER
export const register = (registerData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`http://127.0.0.1:8000/api/v1/register`, registerData, config)
        dispatch({
            type: REGISTER,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

//GET USER DETAILS
export const getUserDetails = (token) => async (dispatch) => {

    try {
        const config = {
            headers: {
                'x-access-token': token,
                'Access-Control-Allow-Headers': '*'
            }
        }
        const { data } = await axios.get(`http://127.0.0.1:8000/api/v1/getUserDetails/${token}`,config)
        dispatch({
            type: GET_USER_DETAILS,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

//LOGIN
export const loginAdmin = (loginData) => async (dispatch) => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`http://127.0.0.1:8000/api/v1/login`, loginData, config)
        dispatch({
            type: LOGIN_ADMIN,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};
//LOGOUT 
export const logoutAdmin = async (dispatch) => {
    await axios.get(`http://127.0.0.1:8000/api/v1/logout`)
    dispatch({
        type: LOGOUT_ADMIN,
        payload: []
    })
};


//Forgot password
export const forgotPassword = (forgotPasswordData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json' 
            }
        }
        const { data } = await axios.post(`http://127.0.0.1:8000/api/v1/password/forgot`,  forgotPasswordData,config)
        dispatch({
            type: FORGOT_PASSWORD,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured', success: false }
    }
}


//Reset password
export const resetPassword = (token, resetPasswordsData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json' 
            }
        }
        const { data } = await axios.put(`http://127.0.0.1:8000/api/v1/password/reset/${token}`,  resetPasswordsData,config)
        dispatch({
            type: RESET_PASSWORD,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured', success: false }
    }
}








//Edit Profile Details
export const editUserDetails = (id, userData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`http://127.0.0.1:8000/api/v1/me/update/${id}`, userData, config)
        dispatch({
            type: EDIT_PROFILE,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};




//Edit Profile Details FOR ADMIN ONLY
export const editUserDetailsAdmin = (id, userData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`http://127.0.0.1:8000/api/v1/admin/user/update/${id}`, userData, config)
        dispatch({
            type: EDIT_PROFILE_ADMIN,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};



//Delete User FOR ADMIN ONLY
export const deleteUserAdmin = (id) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`http://127.0.0.1:8000/api/v1/admin/user/delete/${id}`)
        dispatch({
            type: DELETE_USER_ADMIN,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};


//Get all users
export const getAllUsers = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://127.0.0.1:8000/api/v1/admin/users/all`)
        dispatch({
            type: GET_ALL_USERS,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};