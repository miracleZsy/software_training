import * as customerTypes from '../types/customerTypes';

export const fetchCustomer = (customerData) => {
    return {
        type: customerTypes.FETCH_CUSTOMER,
        customerData: customerData
    };
};


export const deleteCustomer = (deleteIndex) => {
    return {
        type: customerTypes.DELETE_CUSTOMER,
        deleteIndex: deleteIndex
    };
};


export const getCheckedCustomer = (checkedCustomer) => {
    return {
        type: customerTypes.CHECKED_CUSTOMER,
        checkedCustomer: checkedCustomer
    };
};