import * as saleManageTypes from '../types/saleManageTypes';

const init = {
    saleTab: 0,
    saleAnalyse: []
};

const saleManageReducer = (state = init, action) => {
    switch (action.type) {
    case saleManageTypes.SET_SALE_TAB:
        return { ...state, saleTab: action.saleTab };
    case saleManageTypes.SET_SALE_ANALYSE:
        return { ...state, saleAnalyse: action.saleAnalyse };
    default:
        return state;
    }
};

export default saleManageReducer;