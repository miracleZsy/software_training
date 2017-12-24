import * as customerDetailTypes from '../types/customerDetailTypes';

const init = {
    customerDetail: {}
};

const customerDetailReducer = (state = init, action) => {
    switch (action.type) {
    case customerDetailTypes.FETCH_CUSTOMER_DETAIL:
        return { ...state, customerDetail: action.customerDetail };
    default:
        return state;
    }
};

export default customerDetailReducer;