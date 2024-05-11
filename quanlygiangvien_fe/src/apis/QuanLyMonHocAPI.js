import axios from "../utils/axiosCustomize.js";

const fetchAllMonHoc = (keyword, page, pageSize) => {
  const search = keyword
    ? Object.entries(keyword)
        .filter(([key, value]) => value !== undefined && value !== "")
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&")
    : "";
  let res = axios.get(
    `/api/monHoc?pageNo=${page}&pageSize=${pageSize}&${search}`
  );
  return res;
};

const fetchAllBoMon = () => {
  let res = axios.get(`/api/monHoc/boMon`);
  return res;
};

const addMonHoc = (data) => {
  let res = axios.post(`http://localhost:8080/api/monHoc`, data);
  return res;
};

const getMonHoc = (id) => {
  let res = axios.get(`http://localhost:8080/api/monHoc/${id}`);
  return res;
};

const updateMonHoc = (data, idMonHoc) => {
  let res = axios.put(
    `http://localhost:8080/api/monHoc/${idMonHoc}/update`,
    data
  );
  return res;
};

const updateMonHocXoaMem = (idMonHoc) => {
  let res = axios.put(
    `http://localhost:8080/api/monHoc/${idMonHoc}/update-xoaMem`
  );
  return res;
};

export {
  fetchAllMonHoc,
  fetchAllBoMon,
  addMonHoc,
  updateMonHoc,
  updateMonHocXoaMem,
  getMonHoc,
};
