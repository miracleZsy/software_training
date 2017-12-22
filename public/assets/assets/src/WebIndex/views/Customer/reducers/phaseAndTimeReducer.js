import * as phaseAndTimeTypes from '../types/phaseAndTimeTypes';

const init = {
    phaseType: 0,
    time: 0,
    currentPage: 0
};

const phaseAndTimeReducer = (state = init, action) => {
    switch (action.type) {
    case phaseAndTimeTypes.SET_PHASE_TYPE:
        return { ...state, phaseType: action.phaseType };
    case phaseAndTimeTypes.SET_TIME:
        return { ...state, time: action.time };
    case phaseAndTimeTypes.SET_CURRENT_PAGE:
        return { ...state, currentPage: action.currentPage };
    default:
        return state;
    }
};

export default phaseAndTimeReducer;