import * as types from '../types';

const INITIAL_STATE = {
    time: 0,
    currentPage: 1,
    sharingType: 0,
    sharedCustomerData: [],
    sharedCustomerCount: 0,
    receivedCustomerData: [],
    receivedCustomerCount: 0,
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
    case types.FETCH_SHARED_CUSTOMER:
        return {
            ...state,
            sharedCustomerData: action.sharedCustomerData,
        };
    case types.FETCH_RECEIVED_CUSTOMER:
        return {
            ...state,
            receivedCustomerData: action.receivedCustomerData,
        };
    case types.INSERT_SHARED_CUSTOMER:
        return {
            ...state,
            sharedCustomerData: [...state.sharedCustomerData, action.sharedCustomer],
        };
    case types.DELETE_SHARED_CUSTOMER:
        return {
            ...state,
            sharedCustomerData: state.sharedCustomerData.filter(item => item.id != action.payload),
        };
    case types.DELETE_RECEIVED_CUSTOMER:
        return {
            ...state,
            receivedCustomerData: state.receivedCustomerData.filter(item => item.id != action.payload),
        };
    case types.FETCH_SHARED_AND_RECEIVED_CUSTOMER_COUNT:
        return {
            ...state,
            sharedCustomerCount: action.payload.shareCount,
            receivedCustomerCount: action.payload.sharedCount,
        };
    default:
        return state;
    }
};

export default sharingManagementReducer;