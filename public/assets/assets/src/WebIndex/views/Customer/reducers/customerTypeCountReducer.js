import * as customerTypeCountTypes from '../types/customerTypeCountTypes';

const init = {
    totalCustomerCount: 0,
    simpleCustomerCount: 0,
    purposeCustomerCount: 0,
    finishCustomerCount: 0
};

const customerTypeCountReducer = (state = init, action) => {
    switch (action.type) {
    case customerTypeCountTypes.SET_TOTAL_CUSTOMER_COUNT:
        return { ...state, totalCustomerCount: action.totalCustomerCount };
    case customerTypeCountTypes.SET_SIMPLE_CUSTOMER_COUNT:
        return { ...state, simpleCustomerCount: action.simpleCustomerCount };
    case customerTypeCountTypes.SET_PURPOSE_CUSTOMER_COUNT:
        return { ...state, purposeCustomerCount: action.purposeCustomerCount };
    case customerTypeCountTypes.SET_FINISH_CUSTOMER_COUNT:
        return { ...state, finishCustomerCount: action.finishCustomerCount };
    default:
        return state;
    }
};

export default customerTypeCountReducer;