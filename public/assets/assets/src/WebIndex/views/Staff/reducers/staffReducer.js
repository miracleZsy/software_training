import * as types from '../types';

const INITIAL_STATE = {
    currentPage: 1,
    staffData: [],
    staffCount: 0,
    newStaff: {},
    activeStaff: {},
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
    case types.SET_STAFF_COUNT:
        return {
            ...state,
            staffCount: action.staffCount,
        };
    case types.CREATE_STAFF:
        return {
            ...state,
            newStaff: action.staff,
            staffData: state.staffData.push(action.staff),
            staffCount: state.staffCount ++,
        };
    case types.SET_ACTIVE_STAFF:
        return {
            ...state,
            activeStaff: action.payload,
        };
    case types.MODIFY_STAFF:
        return {
            ...state,
            staffData: state.staffData.map((item) => {
                return item.uuid == action.payload.uuid ? { ...item, ...action.payload } : item;
            }),
        };
    case types.DELETE_STAFF:
        return {
            ...state,
            staffData: state.staffData.filter(item => item.uuid != action.payload),
        };
    default:
        return state;
    }
};

export default staffReducer;