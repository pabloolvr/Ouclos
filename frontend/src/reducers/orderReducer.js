import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_RESET,
    ORDER_CREATE_SUCCESS,
} from '../constants/orderConstants';

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            // make request to create order
            return { loading: true };
        case ORDER_CREATE_SUCCESS:
            // when order is successfully created
            return { loading: false, success: true, order: action.payload };
        case ORDER_CREATE_FAIL:
            // if there is an error when creating order
            return { loading: false, error: action.payload };
        case ORDER_CREATE_RESET:
            return {};
        default:
            return state;
    }
};