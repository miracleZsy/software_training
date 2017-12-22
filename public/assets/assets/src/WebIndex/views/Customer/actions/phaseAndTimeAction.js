import * as phaseAndTimeTypes from '../types/phaseAndTimeTypes';

export const setPhaseType = (phaseType) => {
    return {
        type: phaseAndTimeTypes.SET_PHASE_TYPE,
        phaseType: phaseType
    };
};


export const setTime = (time) => {
    return {
        type: phaseAndTimeTypes.SET_TIME,
        time: time
    };
};


export const setPage = (currentPage) => {
    return {
        type: phaseAndTimeTypes.SET_CURRENT_PAGE,
        currentPage: currentPage
    };
};

