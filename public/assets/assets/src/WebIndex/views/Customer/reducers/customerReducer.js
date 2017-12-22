import * as customerTypes from '../types/customerTypes';

const init = {
    customerData: [],
    checkedCustomer: {}
};

const customerReducer = (state = init, action) => {
    switch (action.type) {
    case customerTypes.FETCH_CUSTOMER:
        return { ...state, customerData: action.customerData };
    case customerTypes.DELETE_CUSTOMER:
        return{
            ...state,
            customerData:[
                ...state.customerData.slice(0, action.deleteIndex),
                ...state.customerData.slice(action.deleteIndex + 1)
            ]
        };
    case customerTypes.CHECKED_CUSTOMER:
        return { ...state, checkedCustomer: action.checkedCustomer };
    default:
        return state;
    }
};

export default customerReducer;