const { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_DETAILS_FAIL, 
    PRODUCT_CREATE_REQUEST, 
    PRODUCT_CREATE_SUCCESS, 
    PRODUCT_CREATE_FAIL, 
    PRODUCT_CREATE_RESET,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_RESET,
    PRODUCT_GENDER_LIST_REQUEST,
    PRODUCT_GENDER_LIST_SUCCESS,
    PRODUCT_GENDER_LIST_FAIL,
    PRODUCT_REVIEW_CREATE_RESET,
    PRODUCT_REVIEW_CREATE_FAIL,
    PRODUCT_REVIEW_CREATE_SUCCESS,
    PRODUCT_REVIEW_CREATE_REQUEST,
    PRODUCT_STYLE_LIST_REQUEST,
    PRODUCT_STYLE_LIST_SUCCESS,
    PRODUCT_STYLE_LIST_FAIL,
    PRODUCT_LENS_MATERIAL_LIST_REQUEST,
    PRODUCT_LENS_MATERIAL_LIST_SUCCESS,
    PRODUCT_LENS_MATERIAL_LIST_FAIL,
    PRODUCT_FRAME_COLOR_LIST_REQUEST,
    PRODUCT_FRAME_COLOR_LIST_SUCCESS,
    PRODUCT_FRAME_COLOR_LIST_FAIL,
    PRODUCT_LENS_COLOR_LIST_REQUEST,
    PRODUCT_LENS_COLOR_LIST_SUCCESS,
    PRODUCT_LENS_COLOR_LIST_FAIL,
    PRODUCT_CATEGORY_LIST_REQUEST,
    PRODUCT_CATEGORY_LIST_SUCCESS,
    PRODUCT_CATEGORY_LIST_FAIL,
    PRODUCT_STOCK_UPDATE_RESET,
    PRODUCT_STOCK_UPDATE_FAIL,
    PRODUCT_STOCK_UPDATE_SUCCESS,
    PRODUCT_STOCK_UPDATE_REQUEST,
} = require('../constants/productConstants');

export const productListReducer = (state = { loading: true, products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true };
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload };
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const productCategoryListReducer = (state = { loading: true, products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_CATEGORY_LIST_REQUEST:
            return { loading: true };
        case PRODUCT_CATEGORY_LIST_SUCCESS:
            return { loading: false, categories: action.payload };
        case PRODUCT_CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const productGenderListReducer = (state = { loading: true, products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_GENDER_LIST_REQUEST:
            return { loading: true };
        case PRODUCT_GENDER_LIST_SUCCESS:
            return { loading: false, genders: action.payload };
        case PRODUCT_GENDER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const productStyleListReducer = (state = { loading: true, products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_STYLE_LIST_REQUEST:
            return { loading: true };
        case PRODUCT_STYLE_LIST_SUCCESS:
            return { loading: false, styles: action.payload };
        case PRODUCT_STYLE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const productLensMaterialListReducer = (state = { loading: true, products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LENS_MATERIAL_LIST_REQUEST:
            return { loading: true };
        case PRODUCT_LENS_MATERIAL_LIST_SUCCESS:
            return { loading: false, lensMaterials: action.payload };
        case PRODUCT_LENS_MATERIAL_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const productFrameColorListReducer = (state = { loading: true, products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_FRAME_COLOR_LIST_REQUEST:
            return { loading: true };
        case PRODUCT_FRAME_COLOR_LIST_SUCCESS:
            return { loading: false, frameColors: action.payload };
        case PRODUCT_FRAME_COLOR_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const productLensColorListReducer = (state = { loading: true, products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LENS_COLOR_LIST_REQUEST:
            return { loading: true };
        case PRODUCT_LENS_COLOR_LIST_SUCCESS:
            return { loading: false, lensColors: action.payload };
        case PRODUCT_LENS_COLOR_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const productDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true };
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true };
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export const productUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true };
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};

export const productUpdateStockReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_STOCK_UPDATE_REQUEST:
            return { loading: true };
        case PRODUCT_STOCK_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case PRODUCT_STOCK_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_STOCK_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};

export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true };
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true };
        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_DELETE_RESET:
            return {};
        default:
            return state;
    }
};

export const productReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_REVIEW_CREATE_REQUEST:
            return { loading: true };
        case PRODUCT_REVIEW_CREATE_SUCCESS:
            return { loading: false, success: true, review: action.payload };
        case PRODUCT_REVIEW_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_REVIEW_CREATE_RESET:
            return {};
        default:
            return state;
    }
};