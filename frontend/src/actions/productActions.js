import Axios from "axios";
import { 
    PRODUCT_CATEGORY_LIST_FAIL,
    PRODUCT_CATEGORY_LIST_REQUEST,
    PRODUCT_CATEGORY_LIST_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DETAILS_FAIL, 
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_FRAME_COLOR_LIST_FAIL, 
    PRODUCT_FRAME_COLOR_LIST_REQUEST, 
    PRODUCT_FRAME_COLOR_LIST_SUCCESS, 
    PRODUCT_GENDER_LIST_FAIL, 
    PRODUCT_GENDER_LIST_REQUEST, 
    PRODUCT_GENDER_LIST_SUCCESS, 
    PRODUCT_LENS_COLOR_LIST_FAIL, 
    PRODUCT_LENS_COLOR_LIST_REQUEST, 
    PRODUCT_LENS_COLOR_LIST_SUCCESS, 
    PRODUCT_LENS_MATERIAL_LIST_FAIL, 
    PRODUCT_LENS_MATERIAL_LIST_REQUEST, 
    PRODUCT_LENS_MATERIAL_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_REVIEW_CREATE_FAIL, 
    PRODUCT_REVIEW_CREATE_REQUEST, 
    PRODUCT_REVIEW_CREATE_SUCCESS, 
    PRODUCT_STOCK_UPDATE_FAIL, 
    PRODUCT_STOCK_UPDATE_REQUEST, 
    PRODUCT_STOCK_UPDATE_SUCCESS, 
    PRODUCT_STYLE_LIST_FAIL, 
    PRODUCT_STYLE_LIST_REQUEST, 
    PRODUCT_STYLE_LIST_SUCCESS, 
    PRODUCT_UPDATE_FAIL, 
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS
} from "../constants/productConstants";

/**
 * Use api to get list of products and send it to redux store.
 */
export const listProducts = ({ 
    name = '', 
    category = '',
    gender = '',
    lensMaterial = '',
    style = '',
    frameColor = '',
    lensColor = '',
    order = '',
    min = 0,
    max = 0,
    rating = 0,
    }) => async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    });
        try { // get data from - backend `/api/products?name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`
        const { data } = await Axios.get(
            `/api/products?name=${name}&category=${category}&gender=${gender}&lensMaterial=${lensMaterial}&style=${style}&frameColor=${frameColor}&lensColor=${lensColor}&min=${min}&max=${max}&rating=${rating}&order=${order}`
            );
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    } catch(e) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: e.message })
    }
};
/**
 * Use api to get list of products categories and send it to redux store.
 */
export const listProductCategories = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_CATEGORY_LIST_REQUEST,
    });
    try {
        const { data } = await Axios.get(`/api/products/categories`);
        dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_CATEGORY_LIST_FAIL, payload: error.message });
    }
};
/**
 * Use api to get list of products genders and send it to redux store.
 */
export const listProductGenders = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_GENDER_LIST_REQUEST,
    });
    try {
        const { data } = await Axios.get(`/api/products/genders`);
        dispatch({ type: PRODUCT_GENDER_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_GENDER_LIST_FAIL, payload: error.message });
    }
};
/**
 * Use api to get list of products styles and send it to redux store.
 */
export const listProductStyles = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_STYLE_LIST_REQUEST,
    });
    try {
        const { data } = await Axios.get(`/api/products/styles`);
        dispatch({ type: PRODUCT_STYLE_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_STYLE_LIST_FAIL, payload: error.message });
    }
};
/**
 * Use api to get list of products lens materials  and send it to redux store.
 */
export const listProductLensMaterials = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_LENS_MATERIAL_LIST_REQUEST,
    });
    try {
        const { data } = await Axios.get(`/api/products/lensmaterials`);
        dispatch({ type: PRODUCT_LENS_MATERIAL_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_LENS_MATERIAL_LIST_FAIL, payload: error.message });
    }
};
/**
 * Use api to get list of products frame colors  and send it to redux store.
 */
export const listProductFrameColors = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_FRAME_COLOR_LIST_REQUEST,
    });
    try {
        const { data } = await Axios.get(`/api/products/framecolors`);
        dispatch({ type: PRODUCT_FRAME_COLOR_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_FRAME_COLOR_LIST_FAIL, payload: error.message });
    }
};
/**
 * Use api to get list of products lens colors and send it to redux store.
 */
export const listProductLensColors = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_LENS_COLOR_LIST_REQUEST,
    });
    try {
        const { data } = await Axios.get(`/api/products/lenscolors`);
        dispatch({ type: PRODUCT_LENS_COLOR_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_LENS_COLOR_LIST_FAIL, payload: error.message });
    }
};
/**
 * Use api to get details from a product by its id and send it to redux store.
 */
export const detailsProduct = (productId) => async(dispatch) => {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId});
    try {
        const {data} = await Axios.get(`/api/products/${productId}`);
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data});
    } catch(error) {
        dispatch({ 
            type: PRODUCT_DETAILS_FAIL, 
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        });
    }
};
/**
 * Use api to create a product.
 */
export const createProduct = () => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    const {
        userLogin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.post('/api/products', {},
            {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            }
        );
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data.product,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: PRODUCT_CREATE_FAIL, payload: message });
    }
};
/**
 * Use api to update product information.
 */
export const updateProduct = (product) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
    const {
        userLogin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.put(`/api/products/${product._id}`, product, 
            {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            });
        dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: PRODUCT_UPDATE_FAIL, error: message });
    }
};
/**
 * Use api to update product stock quantity.
 */
export const updateProductStock = (product) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_STOCK_UPDATE_REQUEST, payload: product });
    const {
        userLogin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.put(`/api/products/${product._id}/stock`, product,
            {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            });
        dispatch({ type: PRODUCT_STOCK_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: PRODUCT_STOCK_UPDATE_FAIL, error: message });
    }
};
/**
 * Use api to delete product.
 */
export const deleteProduct = (productId) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const {
        userLogin: { userInfo },
    } = getState();
    try {
        const { data } = Axios.delete(`/api/products/${productId}`, 
            {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            });
        dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
    }
};
/**
 * Use api to create a review for a product.
 */
export const createReview = (productId, review) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_REVIEW_CREATE_REQUEST });
    const {
        userLogin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.post(`/api/products/${productId}/reviews`, review,
            {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            });
        dispatch({
            type: PRODUCT_REVIEW_CREATE_SUCCESS,
            payload: data.review,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: PRODUCT_REVIEW_CREATE_FAIL, payload: message });
    }
};
