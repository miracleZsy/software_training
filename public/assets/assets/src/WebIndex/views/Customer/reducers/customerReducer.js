import * as customerTypes from '../types/customerTypes';

const init = {
    customerData: [],
    checkedCustomer: {},
    customerTotalCount: 6
};

const customerReducer = (state = init, action) => {
    switch (action.type) {
    case customerTypes.FETCH_CUSTOMER:
        return { ...state, customerData: action.customerData };
    case customerTypes.CHECKED_CUSTOMER:
        return { ...state, checkedCustomer: action.checkedCustomer };
    case customerTypes.CUSTOMER_TOTAL_COUNT:
        return { ...state, customerTotalCount: action.customerTotalCount };
    default:
        return state;
    }
};

export default customerReducer;