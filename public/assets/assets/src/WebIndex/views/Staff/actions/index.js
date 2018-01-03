import * as types from '../types';

export const setCurrentPage = (currentPage) =>  {
    return {
        type: types.SET_CURRENT_PAGE,
        currentPage: currentPage,
    };
};

export const fetchStaff = (staffData) =>  {
    return {
        type: types.FETCH_STAFF,
        staffData,
    };
};

export const setStaffCount = (count) =>  {
    return {
        type: types.SET_STAFF_COUNT,
        staffCount: count,
    };
};

