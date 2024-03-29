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
    SET_DATA_BOMONTHEOCOSO,
    SET_DATA_CHUYENNGANH,
    RELOAD_DATA
} from "./constants";

export const initData = {
    isShowAdd: false,
    isShowEdit: false,
    isLoading: true,
    filter: {
        tenChuyenNganh: null,
        idBoMon: "0",
        idCoSo: "0",
        tinhTrang: "0"
    },
    page: 0,
    pageSize: 0,
    totalElements: 0,
    isReload: false,
    target: null,
    data: [],
    data_nhanVien: [],
    data_boMon: [],
    data_coSo: [],
    data_boMonTheoCoSo: [],
    data_chuyenNganh: []
};

const reducer = (state, action) => {

    let newState;

    switch(action.type) {

        case RELOAD_DATA: 
            newState = {
                ...state,
                isReload: !state.isReload
            };
            break;

        case SET_LOADING: 
            newState = {
                ...state,
                isLoading: action.payload
            };
            break;

        case SET_FILTER:
            newState = {
                ...state,
                filter: action.payload
            };
            break;

        case SET_PAGE:
            newState = {
                ...state,
                page: action.payload
            };
            break;

        case SET_PAGE_SIZE:
            newState = {
                ...state,
                pageSize: action.payload
            };
            break;

        case SET_TOTAL_ELEMENT:
            newState = {
                ...state,
                totalElements: action.payload
            };
            break;

        case SET_DATA: 
            newState = {
                ...state,
                data: action.payload
            };
            break;

        case SHOW_MODAL_ADD: 
            newState = {
                ...state,
                isShowAdd: action.payload
            };
            break;
        
        case SHOW_MODAL_EDIT: 
            newState = {
                ...state,
                isShowEdit: action.payload
            };
            break;

        case SET_TARGET: 
            newState = {
                ...state,
                target: action.payload
            };
            break;

        case SET_DATA_NHANVIEN: 
            newState = {
                ...state,
                data_nhanVien: action.payload
            };
            break;

        case SET_DATA_BOMON: 
            newState = {
                ...state,
                data_boMon: action.payload
            };
            break;

        case SET_DATA_COSO: 
            newState = {
                ...state,
                data_coSo: action.payload
            };
            break;

        case SET_DATA_BOMONTHEOCOSO: 
            newState = {
                ...state,
                data_boMonTheoCoSo: action.payload
            };
            break;

        case SET_DATA_CHUYENNGANH: 
            newState = {
                ...state,
                data_chuyenNganh: action.payload
            };
            break;
        default: 
            return state;
    }

    return newState;
};

export default reducer;