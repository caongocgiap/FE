import instance from "../utils/axiosCustomize";

export const XOA_MEM = {
    chua_xoa: "CHUA_XOA",
    da_xoa: "DA_XOA",
    xoa_han: "XOA_HAN"
};


export const URL_API = {
    init_data_nhanvien: '/api/chuyen-nganh-theo-co-so/get-data/nhan-vien',
    init_data_bm_and_cs: '/api/chuyen-nganh-theo-co-so/get-data/bo-mon-and-co-so',
    init_data_cn_and_bmtcs: '/api/chuyen-nganh-theo-co-so/get-data/chuyen-nganh-and-bo-mon-theo-co-so',
    list: '/api/chuyen-nganh-theo-co-so/list',
    add: '/api/chuyen-nganh-theo-co-so/add',
    delete: '/api/chuyen-nganh-theo-co-so/delete',
    update: '/api/chuyen-nganh-theo-co-so/update',
    get: '/api/chuyen-nganh-theo-co-so/get'
};


const requestGet = async (path, options = {}) => {
    const response = await instance.get(path, options);
    return response.data;
};

const requestPut = async (path, options = {}) => {
    const response = await instance.put(path, options);
    return response.data;
};

const requestPost = async (path, options = {}) => {
    const response = await instance.post(path, options);
    return response.data;
};

const requestDelete = async (path, options = {}) => {
    const response = await instance.delete(path, options);
    return response.data;
};

export { requestGet, requestDelete, requestPut, requestPost };