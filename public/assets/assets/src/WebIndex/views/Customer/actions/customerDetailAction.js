import * as customerDetailTypes from '../types/customerDetailTypes';

export const fetchCustomerDetail = (customerDetail) => {
    return {
        type: customerDetailTypes.FETCH_CUSTOMER_DETAIL,
        customerDetail: customerDetail
    };
};


