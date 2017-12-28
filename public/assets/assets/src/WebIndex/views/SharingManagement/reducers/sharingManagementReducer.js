import * as types from '../types';

const INITIAL_STATE = {
    time: 0,
    currentPage: 1,
    sharingType: 0,
};

const sharingManagementReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case types.SET_SHARING_TIME:
        return {
            ...state,
            time: action.time,
        };
    case types.SET_CURRENT_PAGE:
        return {
            ...state,
            currentPage: action.currentPage,
        };
    case types.SET_SHARING_TYPE:
        return {
            ...state,
            sharingType: action.sharingType,
        };
    default:
        return state;
    }
};

export default sharingManagementReducer;