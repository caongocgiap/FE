import React, { useEffect, useReducer } from "react";
import { Container } from "react-bootstrap";
import ListMonHoc from "./layout/ListMonHoc";
import { MonHocProvider } from "./context/MonHocContext";
import SearchBarMonHoc from "./layout/SearchBarMonHoc";
import AddMonHoc from "./layout/AddMonHoc";
import UpdateMonHoc from "./layout/UpdateMonHoc";
import DetailMonHoc from "./layout/DetailMonHoc";

const QuanLyMonHoc = () => {
  return (
    <Container>
      <h2 className="text-primary-emphasis p-4 gap-3 d-flex align-items-center">
        Quản lý môn học
      </h2>
      {/* Đảm bảo rằng MonHocProvider được bao bọc bên ngoài component QuanLyMonHoc */}
      <MonHocProvider>
        <SearchBarMonHoc />
        <ListMonHoc />
        <AddMonHoc />
        <DetailMonHoc />
        <UpdateMonHoc />
        {/* <UpdateMonHoc />
        <DetailMonHoc /> */}
      </MonHocProvider>
    </Container>
  );
};

export default QuanLyMonHoc;
