import * as customerTypes from '../types/customerTypes';

export const fetchCustomer = (customerData) => {
    return {
        type: customerTypes.FETCH_CUSTOMER,
        customerData: customerData
    };
};

export const getCheckedCustomer = (checkedCustomer) => {
    return {
        type: customerTypes.CHECKED_CUSTOMER,
        checkedCustomer: checkedCustomer
    };
};

export const getCustomerTotalCount = (customerTotalCount) => {
    return {
        type: customerTypes.CUSTOMER_TOTAL_COUNT,
        customerTotalCount: customerTotalCount
    };
};