import axios from "../utils/axiosCustomize.js";

const fetchAllMonHoc = (data) => {
  const search = data.search
    ? Object.entries(data.search)
        .filter(([key, value]) => value !== undefined && value !== "")
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&")
    : "";
  console.log("==============");
  console.log(search);
  console.log("==============");
  let res = axios.get(
    `/api/monHoc?pageNo=${data.pageNo}&pageSize=${data.pageSize}&${search}`
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
};
