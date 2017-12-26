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