import {
  SET_DATA,
  SHOW_MODAL_ADD,
  SHOW_MODAL_EDIT,
  SHOW_MODAL_DETAIL,
  SET_TARGET,
  SET_LOADING,
  SET_KEYWORD,
  SET_PAGE,
  SET_TOTAL_ELEMENT,
  SET_RELOAD,
  SET_PAGE_SIZE,
  SET_DATA_BO_MON,
} from "./type.js";

export const setPage = (payload) => {
  return {
    type: SET_PAGE,
    payload,
  };
};

export const setPageSize = (payload) => {
  return {
    type: SET_PAGE_SIZE,
    payload,
  };
};

export const setTotalElement = (payload) => {
  return {
    type: SET_TOTAL_ELEMENT,
    payload,
  };
};

export const setKeyword = (payload) => {
  return {
    type: SET_KEYWORD,
    payload,
  };
};

export const setLoading = (payload) => {
  return {
    type: SET_LOADING,
    payload,
  };
};

export const setData = (payload) => {
  return {
    type: SET_DATA,
    payload,
  };
};

export const setDataBoMon = (payload) => {
  return {
    type: SET_DATA_BO_MON,
    payload,
  };
};

export const showModalAdd = (payload) => {
  return {
    type: SHOW_MODAL_ADD,
    payload,
  };
};

export const showModalEdit = (payload) => {
  return {
    type: SHOW_MODAL_EDIT,
    payload,
  };
};

export const showModalDetail = (payload) => {
  return {
    type: SHOW_MODAL_DETAIL,
    payload,
  };
};

export const setTarget = (payload) => {
  return {
    type: SET_TARGET,
    payload,
  };
};

export const setReload = (payload) => {
  return {
    type: SET_RELOAD,
    payload,
  };
};
