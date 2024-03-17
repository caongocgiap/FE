import { 
    SET_LOADING,
    SET_DATA,
    SHOW_MODAL_ADD,
    SHOW_MODAL_EDIT,
    SET_TARGET,
    SET_FILTER,
    SET_PAGE,
    SET_PAGE_SIZE,
    SET_TOTAL_ELEMENT,
    SET_DATA_NHANVIEN,
    SET_DATA_BOMON,
    SET_DATA_COSO,
    SET_DATA_CHUYENNGANH,
    SET_DATA_BOMONTHEOCOSO,
    RELOAD_DATA
} from "./constants";

export const reloadData = payload => {
    return {
        type: RELOAD_DATA,
        payload
    };
};

export const setPage = payload => {
    return {
        type: SET_PAGE,
        payload
    };
};

export const setPageSize = payload => {
    return {
        type: SET_PAGE_SIZE,
        payload
    };
};

export const setTotalElement = payload => {
    return {
        type: SET_TOTAL_ELEMENT,
        payload
    };
};

export const setFilter = payload => {
    return {
        type: SET_FILTER,
        payload
    };
};


export const setLoading = payload => {
    return {
        type: SET_LOADING,
        payload
    };
};

export const setData = payload => {
    return {
        type: SET_DATA,
        payload
    };
};

export const showModalAdd = payload => {
    return {
        type: SHOW_MODAL_ADD,
        payload
    };
};

export const showModalEdit = payload => {
    return {
        type: SHOW_MODAL_EDIT,
        payload
    };
};

export const setTarget = payload => {
    return {
        type: SET_TARGET,
        payload
    };
};

export const setDataBoMon = payload => {
    return {
        type: SET_DATA_BOMON,
        payload
    };
};

export const setDataCoSo = payload => {
    return {
        type: SET_DATA_COSO,
        payload
    };
};

export const setDataBoMonTheoCoSo = payload => {
    return {
        type: SET_DATA_BOMONTHEOCOSO,
        payload
    };
};

export const setDataChuyenNganh = payload => {
    return {
        type: SET_DATA_CHUYENNGANH,
        payload

    };
};

export const setDataNhanVien = payload => {
    return {
        type: SET_DATA_NHANVIEN,
        payload

    };
};