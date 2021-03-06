import * as saleManageTypes from '../types/saleManageTypes';

export const setSaleTab = (saleTab) => {
    return {
        type: saleManageTypes.SET_SALE_TAB,
        saleTab: saleTab
    };
};

export const fetchSaleAnalyse = (saleAnalyse) => {
    return {
        type: saleManageTypes.SET_SALE_ANALYSE,
        saleAnalyse: saleAnalyse
    };
};

export const setSaleTimeType = (saleTimeType) => {
    return{
        type: saleManageTypes.SET_SALE_TIME_TYPE,
        saleTimeType: saleTimeType
    };
};

export const setSalePlan = (salePlan) => {
    return{
        type: saleManageTypes.SET_SALE_PLAN,
        salePlan: salePlan
    };
};

export const setCustomerList = (customerList) => {
    return{
        type: saleManageTypes.SET_CUSTOMER_LIST,
        customerList: customerList
    };
};

export const setSaleDetail = (saleDetail) => {
    return{
        type:saleManageTypes.SET_SALE_DETAIL,
        saleDetail:saleDetail
    };
};

export const setSaleCount = (saleCount) => {
    return{
        type:saleManageTypes.SET_SALE_COUNT,
        saleCount:saleCount
    };
};

export const setSaleCurrentPage = (saleCurrentPage) => {
    return{
        type:saleManageTypes.SET_SALE_CURRENT_PAGE,
        saleCurrentPage:saleCurrentPage
    };
};
