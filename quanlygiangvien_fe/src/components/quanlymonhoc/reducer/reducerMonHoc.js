import {
  SET_DATA,
  SHOW_MODAL_ADD,
  SHOW_MODAL_EDIT,
  SHOW_MODAL_DETAIL,
  SET_TARGET,
  SET_LOADING,
  SET_KEYWORD,
  SET_PAGE,
  SET_RELOAD,
  SET_TOTAL_ELEMENT,
  SET_PAGE_SIZE,
  SET_DATA_BO_MON,
} from "./type.js";

export const initDataMonHoc = {
  isShowAdd: false,
  isShowEdit: false,
  isShowDetail: false,
  isLoading: true,
  keyword: {},
  totalElements: 0,
  target: null,
  data: [],
  dataBoMon: [],
  page: 1,
  isReload: false,
  pageSize: 5,
};

const reducerMonHoc = (state = initDataMonHoc, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.payload,
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case SET_PAGE_SIZE:
      return {
        ...state,
        pageSize: action.payload,
      };
    case SET_TOTAL_ELEMENT:
      return {
        ...state,
        totalElements: action.payload,
      };
    case SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case SET_DATA_BO_MON:
      return {
        ...state,
        dataBoMon: action.payload,
      };
    case SHOW_MODAL_ADD:
      return {
        ...state,
        isShowAdd: action.payload,
      };
    case SHOW_MODAL_EDIT:
      return {
        ...state,
        isShowEdit: action.payload,
      };
    case SHOW_MODAL_DETAIL:
      return {
        ...state,
        isShowDetail: action.payload,
      };
    case SET_TARGET:
      return {
        ...state,
        target: action.payload,
      };
    case SET_RELOAD:
      return {
        ...state,
        isReload: action.payload,
      };
    default:
      return state;
  }
};

export default reducerMonHoc;
