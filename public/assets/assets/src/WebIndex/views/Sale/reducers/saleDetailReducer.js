import * as saleDetailTypes from '../types/saleDetailTypes';

const init = {
    title:'',
    customer:[],
    content:'',
    actTime:''
};
const saleDetailReducer = (state = init, action) => {
    switch (action.type) {
    case saleDetailTypes.SET_SALE_TITLE:
        return [...state, action.title];
    case saleDetailTypes.SET_SALE_ACT_TIME:
        return [...state, action.actTime];
    case saleDetailTypes.SET_SALE_CONTENT:
        return [...state, action.content];
    case saleDetailTypes.SET_SALE_CUSTOMER:
        return [...state, action.customer];
    default:
        return state;
    }
};
export default saleDetailReducer;