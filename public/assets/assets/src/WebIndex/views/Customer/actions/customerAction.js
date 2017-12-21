import * as customerTypes from '../types/customerTypes';

export const fetchCustomer = (customerData) => {
    return {
        type: customerTypes.FETCH_CUSTOMER,
        customerData: customerData
    };
};

export const addCustomer = (customerCreated) => {
    return {
        type: customerTypes.ADD_CUSTOMER,
        customerCreated: customerCreated
    };
};


export const deleteCustomer = (deleteIndex) => {
    return {
        type: customerTypes.DELETE_CUSTOMER,
        deleteIndex: deleteIndex
    };
};
