import Axios from 'axios';
import { CART_EMPTY } from '../constants/cartConstants';
import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_PARTICULAR_LIST_REQUEST,
    ORDER_PARTICULAR_LIST_SUCCESS,
    ORDER_PARTICULAR_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_DELETE_REQUEST,
    ORDER_DELETE_SUCCESS,
    ORDER_DELETE_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
} from '../constants/orderConstants';

// create order
export const createOrder = (order) => async (dispatch, getState) => {
    // make a request to create order
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    try {
        const {
            userLogin: { userInfo },
        } = getState();
        const { data } = await Axios.post('/api/orders', order, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
        dispatch({ type: CART_EMPTY });
        localStorage.removeItem('cartItems');
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

// get order details by its id
export const getOrderDetails = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const {
        userLogin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get(`/api/orders/${orderId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
    }
};
// get list of orders of an specific user
export const getParticularOrderList = () => async (dispatch, getState) => {
    dispatch({ type: ORDER_PARTICULAR_LIST_REQUEST });
    const {
        userLogin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get('/api/orders/mine', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({ type: ORDER_PARTICULAR_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: ORDER_PARTICULAR_LIST_FAIL, payload: message });
    }
};
// get list of all orders made
export const listOrders = () => async (dispatch, getState) => {
    dispatch({ type: ORDER_LIST_REQUEST });
    const {
        userLogin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get('/api/orders', {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        console.log(data);
        dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: ORDER_LIST_FAIL, payload: message });
    }
};
// delete order by orderId
export const deleteOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
    const {
        userLogin: { userInfo },
    } = getState();
    try {
        const { data } = Axios.delete(`/api/orders/${orderId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: ORDER_DELETE_FAIL, payload: message });
    }
};
// deliver order by id
export const deliverOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DELIVER_REQUEST, payload: orderId });
    const {
        userLogin: { userInfo },
    } = getState();
    try {
        const { data } = Axios.put(`/api/orders/${orderId}/deliver`, {},
            {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            }
        );
        dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: ORDER_DELIVER_FAIL, payload: message });
    }
};