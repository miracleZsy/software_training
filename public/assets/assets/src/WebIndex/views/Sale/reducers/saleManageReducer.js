import * as saleManageTypes from '../types/saleManageTypes';

const init = {
    saleTab: 0,
    saleAnalyse: [],
    saleTimeType: 0,
    salePlan: [],
    customerList: []
};

const saleManageReducer = (state = init, action) => {
    switch (action.type) {
    case saleManageTypes.SET_SALE_TAB:
        return { ...state, saleTab: action.saleTab };
    case saleManageTypes.SET_SALE_ANALYSE:
        return { ...state, saleAnalyse: action.saleAnalyse };
    case saleManageTypes.SET_SALE_TIME_TYPE:
        return { ...state, saleTimeType: action.saleTimeType };
    case saleManageTypes.SET_SALE_PLAN:
        return { ...state, salePlan: action.salePlan };
    case saleManageTypes.SET_CUSTOMER_LIST:
        return { ...state, customerList: action.customerList };
    default:
        return state;
    }
};

export default saleManageReducer;