import * as customerTypeCountTypes from '../types/customerTypeCountTypes';

export const setTotalCustomerCount = (totalCustomerCount) => {
    return {
        type: customerTypeCountTypes.SET_TOTAL_CUSTOMER_COUNT,
        totalCustomerCount: totalCustomerCount
    };
};

export const setSimpleCustomerCount = (simpleCustomerCount) => {
    return {
        type: customerTypeCountTypes.SET_SIMPLE_CUSTOMER_COUNT,
        simpleCustomerCount: simpleCustomerCount
    };
};

export const setPurposeCustomerCount = (purposeCustomerCount) => {
    return {
        type: customerTypeCountTypes.SET_PURPOSE_CUSTOMER_COUNT,
        purposeCustomerCount: purposeCustomerCount
    };
};

export const setFinishCustomerCount = (finishCustomerCount) => {
    return {
        type: customerTypeCountTypes.SET_FINISH_CUSTOMER_COUNT,
        finishCustomerCount: finishCustomerCount
    };
};