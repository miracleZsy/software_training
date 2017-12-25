import * as saleManageTypes from '../types/saleManageTypes';

const init = {
    saleTab: 0,
    saleAnalyse: [],
    saleTimeType: 0,
    timeChart: [],
    customerAmount: []
};

const saleManageReducer = (state = init, action) => {
    switch (action.type) {
    case saleManageTypes.SET_SALE_TAB:
        return { ...state, saleTab: action.saleTab };
    case saleManageTypes.SET_SALE_ANALYSE:
        return { ...state, saleAnalyse: action.saleAnalyse };
    case saleManageTypes.SET_SALE_TIME_TYPE:
        return { ...state, saleTimeType: action.saleTimeType };
    case saleManageTypes.SET_TIME_CHART:
        return { ...state, timeChart: action.timeChart };
    case saleManageTypes.SET_CUSTOMER_AMOUNT:
        return { ...state, customerAmount: action.customerAmount };
    default:
        return state;
    }
};

export default saleManageReducer;