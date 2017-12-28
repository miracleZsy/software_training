import types from '../types';

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

export const fetchSharedCustomer = (sharedData) =>  {
    return {
        type: types.FETCH_SHARED_CUSTOMER,
        sharedData,
    };
};