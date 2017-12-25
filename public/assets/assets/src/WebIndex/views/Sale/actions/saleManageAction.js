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

export const setTimeChart = (timeChart) => {
    return {
        type: saleManageTypes.SET_TIME_CHART,
        timeChart: timeChart
    };
};

export const setCustomerAmount = (customerAmount) => {
    return {
        type: saleManageTypes.SET_CUSTOMER_AMOUNT,
        customerAmount: customerAmount
    };
};