import * as types from '../types';

const INITIAL_STATE = {
    currentPage: 1,
    staffData: [],
};

const staffReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case types.SET_CURRENT_PAGE:
        return {
            ...state,
            currentPage: action.currentPage,
        };
        break;
    case types.FETCH_STAFF:
        return {
            ...state,
            staffData: action.staffData,
        };
    default:
        return state;
    }
};

export default staffReducer;