import * as customerDetailTypes from '../types/customerDetailTypes';

const init = {
    customerDetail: {},
    phaseLog: [],
    sliderValue: 0
};

const customerDetailReducer = (state = init, action) => {
    switch (action.type) {
    case customerDetailTypes.FETCH_CUSTOMER_DETAIL:
        return { ...state, customerDetail: action.customerDetail };
    case customerDetailTypes.FETCH_PHASE_LOG:
        return { ...state, phaseLog: action.phaseLog };
    case customerDetailTypes.SET_SLIDER_VALUE:
        return { ...state, sliderValue: action.sliderValue };
    default:
        return state;
    }
};

export default customerDetailReducer;