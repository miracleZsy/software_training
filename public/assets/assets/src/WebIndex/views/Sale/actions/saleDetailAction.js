import * as saleDetailTypes from '../types/saleDetailTypes';
export const setSaleTitle = (title) => {
    return{
        type:saleDetailTypes.SET_SALE_TITLE,
        title:title
    };
};
export const setSaleCustomer = (customer) => {
    return{
        type:saleDetailTypes.SET_SALE_CUSTOMER,
        customer:customer
    };
};
export const setSaleActTime = (actTime) => {
    return{
        type:saleDetailTypes.SET_SALE_ACT_TIME,
        actTime:actTime
    };
};
export const setSaleContent = (content) => {
    return{
        type:saleDetailTypes.SET_SALE_CONTENT,
        content:content
    };
};
