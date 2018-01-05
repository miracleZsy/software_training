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

export const createStaff = (staff) =>  {
    return {
        type: types.CREATE_STAFF,
        staff,
    };
};

export const setActiveStaff = (staff) =>  {
    return {
        type: types.SET_ACTIVE_STAFF,
        payload: staff,
    };
};

export const modifyStaff = (newStaff) =>  {
    return {
        type: types.MODIFY_STAFF,
        payload: newStaff,
    };
};

export const deleteStaff = (uuid) => {
    return {
        type: types.DELETE_STAFF,
        payload: uuid,
    };
};
