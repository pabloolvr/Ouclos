// redux store
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducer'; 
import { orderCreateReducer, orderDeleteReducer, orderDeliverReducer, orderDetailsReducer, orderListReducer, orderParticularListReducer } from './reducers/orderReducer';
import { productStyleListReducer, productCreateReducer, productDeleteReducer, productDetailsReducer, productGenderListReducer, productListReducer, productReviewCreateReducer, productUpdateReducer, productCategoryListReducer, productLensMaterialListReducer, productFrameColorListReducer, productLensColorListReducer, productUpdateStockReducer } from './reducers/productReducers';
import { userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/userReducer';

const initialState = {
    // get user info from localStorage
    userLogin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    },
    // get cart info from localStorage
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingAddress: localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress'))
            : {},
        paymentMethod: localStorage.getItem('paymentMethod')
            ? JSON.parse(localStorage.getItem('paymentMethod'))
            : {},
    },
};

const reducer = combineReducers({
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userUpdate: userUpdateReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    productList: productListReducer,
    productCategoryList: productCategoryListReducer,
    productGenderList: productGenderListReducer,
    productStyleList: productStyleListReducer,
    productLensMaterialList: productLensMaterialListReducer,
    productFrameColorList: productFrameColorListReducer,
    productLensColorList: productLensColorListReducer,
    productDetails: productDetailsReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productUpdateStock: productUpdateStockReducer,
    productDelete: productDeleteReducer,
    productReviewCreate: productReviewCreateReducer,
    cart: cartReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderParticularList: orderParticularListReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver: orderDeliverReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;