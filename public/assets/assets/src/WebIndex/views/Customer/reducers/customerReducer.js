import * as customerTypes from '../types/customerTypes';

const init = {
    customerData: [],
    checkedCustomer: []
};

const customerReducer = (state = init, action) => {
    switch (action.type) {
    case customerTypes.FETCH_CUSTOMER:
        return { ...state, customerData: action.customerData };
    case customerTypes.ADD_CUSTOMER:
        return { ...state, customerData: [...state.customerData, action.customerCreated] };
    case customerTypes.DELETE_CUSTOMER:
        return{
            ...state,
            customerData:[
                ...state.customerData.slice(0, action.deleteIndex),
                ...state.customerData.slice(action.deleteIndex + 1)
            ]
        };
    default:
        return state;
    }
};

export default customerReducer;