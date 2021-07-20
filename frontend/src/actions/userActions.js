import Axios from 'axios';
import {
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
} from '../constants/userConstants';

// when user register
export const register = (name, surname, cpf, birthdate, publicPlace, publicPlaceNumber, neighborhood, city, state, postalCode, phone, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
    try {
        const { data } = await Axios.post('/api/users/register', {
            name, 
            surname, 
            cpf, 
            birthdate, 
            publicPlace, 
            publicPlaceNumber, 
            neighborhood, 
            city, 
            state, 
            postalCode, 
            phone,  
            email, 
            password
        });
        // update redux store based on user register
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        // update redux store based on user login
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
// when user login
export const login = (email, password) => async (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await Axios.post('/api/users/login', { email, password });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
// when user logout
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod')
    dispatch({ type: USER_LOGOUT });
    //
    document.location.href = '/login';
};
// get user details by id
export const detailsUser = (userId) => async (dispatch, getState) => {
    dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
    const { userLogin: { userInfo }, } = getState();

    try {
        const { data } = await Axios.get(`/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: USER_DETAILS_FAIL, payload: message });
    }
};
// edit user data
export const updateUserProfile = (user) => async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
    const { userLogin: { userInfo }, } = getState();
    try {
        const { data } = await Axios.put(`/api/users/profile`, user, 
        {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data)); // update localStorage
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
    }
};
// get all users
export const listUsers = () => async (dispatch, getState) => {
    dispatch({ type: USER_LIST_REQUEST });
    try {
        const {
            userLogin: { userInfo },
        } = getState();
        const { data } = await Axios.get('/api/users', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: USER_LIST_FAIL, payload: message });
    }
};
// delete an user by id
export const deleteUser = (userId) => async (dispatch, getState) => {
    dispatch({ type: USER_DELETE_REQUEST, payload: userId });
    const {
        userLogin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.delete(`/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: USER_DELETE_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: USER_DELETE_FAIL, payload: message });
    }
};
// update an User
export const updateUser = (user) => async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
    const {
        userLogin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.put(`/api/users/${user._id}`, user, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: USER_UPDATE_FAIL, payload: message });
    }
};