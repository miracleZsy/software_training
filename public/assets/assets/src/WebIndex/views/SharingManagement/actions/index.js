import * as types from '../types';

export const setSharingTime = (time) => {
    return {
        type: types.SET_SHARING_TIME,
        time: time,
    };
};

export const setCurrentPage = (currenPage) => {
    return {
        type: types.SET_CURRENT_PAGE,
        currentPage: currenPage,
    };
};

export const setSharingType = (sharingType) => {
    return {
        type: types.SET_SHARING_TYPE,
        sharingType: sharingType,
    };
};

export const fetchSharedCustomer = (sharedCustomerData) =>  {
    return {
        type: types.FETCH_SHARED_CUSTOMER,
        sharedCustomerData,
    };
};

export const fetchSharedAndReceivedCustomerCount = (countObj) =>  {
    return {
        type: types.FETCH_SHARED_AND_RECEIVED_CUSTOMER_COUNT,
        payload: countObj,
    };
};


export const fetchReceivedCustomer = (receivedCustomerData) => {
    return {
        type: types.FETCH_RECEIVED_CUSTOMER,
        receivedCustomerData,
    };
};

export const insertSharedCustomer = (sharedCustomer) =>  {
    return {
        type: types.INSERT_SHARED_CUSTOMER,
        sharedCustomer,
    };
};

export const deleteSharedCustomer = (removedId) =>  {
    return {
        type: types.DELETE_SHARED_CUSTOMER,
        payload: removedId,
    };
};

export const deleteReceivedCustomer = (removedId) =>  {
    return {
        type: types.DELETE_RECEIVED_CUSTOMER,
        paylaod: removedId,
    };
};


