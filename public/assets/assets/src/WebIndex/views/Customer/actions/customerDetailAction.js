import * as customerDetailTypes from '../types/customerDetailTypes';

export const fetchCustomerDetail = (customerDetail) => {
    return {
        type: customerDetailTypes.FETCH_CUSTOMER_DETAIL,
        customerDetail: customerDetail
    };
};

export const fetchPhaseLog = (phaseLog) => {
    return {
        type: customerDetailTypes.FETCH_PHASE_LOG,
        phaseLog: phaseLog
    };
};

export const setSlideValue = (sliderValue) => {
    return {
        type: customerDetailTypes.SET_SLIDER_VALUE,
        sliderValue: sliderValue
    };
};