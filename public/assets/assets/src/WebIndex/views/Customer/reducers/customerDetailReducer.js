import * as customerDetailTypes from '../types/customerDetailTypes';

const init = {
    customerDetail: {},
    phaseLog: []
};

const customerDetailReducer = (state = init, action) => {
    switch (action.type) {
    case customerDetailTypes.FETCH_CUSTOMER_DETAIL:
        return { ...state, customerDetail: action.customerDetail };
    case customerDetailTypes.FETCH_PHASE_LOG:
        return { ...state, phaseLog: action.phaseLog };
    default:
        return state;
    }
};

export default customerDetailReducer;