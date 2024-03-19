import React, { useEffect, useState } from "react";
import { Button, Modal, Tag } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import {
  DeleteOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { deleteChucVu, fetchAllChucVus } from "../../apis/QuanLyChucVuAPI";
import TablePaginaton from "../component/TablePagination";
import SearchBar from "../component/SearchBarInputSelect";
import {
  fetchAllBoMon,
  fetchAllMonHoc,
  updateMonHocXoaMem,
} from "../../apis/QuanLyMonHocAPI";
import SearchBarMonHoc from "../component/SearchBarMonHoc";
import { useNavigate } from "react-router-dom";
import DetailMonHoc from "./DetailMonHoc";
import UpdateMonHoc from "./UpdateMonHoc";
import AddMonHoc from "./AddMonHoc";

const QuanLyMonHoc = () => {
  const [dataTimKiem, setDataTimKiem] = useState({
    pageNo: 1,
    pageSize: 5,
    search: {},
  });
  const [timKiem, setTimKiem] = useState(false); // id cơ sở
  const [data, setData] = useState([]); // Dữ liệu sản phẩm hiện tại
  const [dataBoMon, setDataBoMon] = useState([]); // Dữ liệu sản phẩm hiện tại
  const [totalProducts, setTotalProducts] = useState(0); // Tổng số sản phẩm
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState();
  const [deleteItemId, setDeleteItemId] = useState(null);
  const dataHinhThuc = ["TRADITIONAL", "ONLINE", "BLEND", "TRUC_TUYEN"];

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "id",
      width: "5%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Mã môn học",
      dataIndex: "ma",
      key: "id",
      width: "20%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên môn học",
      dataIndex: "ten",
      key: "id",
      align: "center",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Hình thức",
      dataIndex: "hinhThuc",
      key: "id",
      align: "center",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Bộ môn",
      dataIndex: "boMon",
      key: "id",
      align: "center",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "id",
      align: "center",
      render: (text) => (
        <Tag
          color={
            text === "MO" ? "green" : text === "DANG_DANG_KY" ? "yellow" : "red"
          }
        >
          {text}
        </Tag>
      ),
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "formattedThoiGianTao",
      key: "id",
      align: "center",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Hành động",
      key: "idCoSo",
      align: "center",
      render: (row) => (
        <>
          <Button
            icon={<FontAwesomeIcon icon={faBuildingCircleArrowRight} />}
            size={"large"}
            type={"primary"}
            style={{
              backgroundColor: "#052C65",
              color: "#ffff",
              marginRight: "10px",
            }}
            onClick={() => {
              handleUpdateChucVu(row);
            }}
          ></Button>
          <Button
            icon={<EyeOutlined />}
            size={"large"}
            type={"primary"}
            style={{
              backgroundColor: "FBA834",
              color: "#ffff",
              marginRight: "10px",
            }}
            onClick={() => {
              handleDetailChucVu(row);
            }}
          ></Button>
          <Button
            icon={<DeleteOutlined />}
            size={"large"}
            type={"primary"}
            style={{
              backgroundColor: "#BF3131",
              color: "#ffff",
            }}
            onClick={() => {
              handleUpdateXoaMem(row.id);
            }}
          ></Button>
        </>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      console.log(dataTimKiem);
      const data = await fetchAllMonHoc(dataTimKiem);
      setData(data.data.content);
      setTotalProducts(data.data.totalElement);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchDataBoMon = async () => {
    try {
      const data = await fetchAllBoMon();
      console.log(data.data);
      setDataBoMon(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handlePageChange = (page, pageSize) => {
    setDataTimKiem({ ...dataTimKiem, pageNo: page, pageSize: pageSize });
  };

  const handleUpdateXoaMem = async (id) => {
    try {
      setDeleteItemId(id);
      const res = await updateMonHocXoaMem(id);
      console.log(res.data);
      if (res.data.httpStatus === "OK") {
        toast.success(res.data.message, {
          position: "top-right",
        });
      }
      setDeleteItemId(null);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleUpdateChucVu = (row) => {
    setDataUpdate(row);
    setIsModalUpdateOpen(true);
    console.log(row);
    console.log(dataUpdate);
  };

  const handleDetailChucVu = (row) => {
    setDataUpdate(row);
    setIsModalDetailOpen(true);
  };

  useEffect(() => {
    fetchData();
  }, [
    dataTimKiem.pageNo,
    isModalAddOpen,
    deleteItemId,
    isModalUpdateOpen,
    timKiem,
  ]);

  useEffect(() => {
    fetchDataBoMon();
  }, []);

  return (
    <>
      <h2
        className={"text-primary-emphasis p-4 gap-3 d-flex align-items-center"}
      >
        Quản lý bộ môn
      </h2>
      <Container fluid className={"shadow-lg p-5 rounded-3 "}>
        <SearchBarMonHoc
          dataBoMon={dataBoMon}
          setDataTimKiem={setDataTimKiem}
          dataTimKiem={dataTimKiem}
          setTimKiem={setTimKiem}
          timKiem={timKiem}
        ></SearchBarMonHoc>
      </Container>
      <Container fluid className={"shadow-lg p-4 rounded-3 mt-5"}>
        <div className={"d-flex justify-content-between align-items-center"}>
          <div className={"d-flex align-items-center mb-3"}>
            <Button
              icon={<UnorderedListOutlined className="custom-icon" />}
              style={{
                backgroundColor: "#052C65",
                color: "#ffff",
              }}
            ></Button>
            <h4 className="p-2">Quản lý bộ môn</h4>
          </div>
          <Button
            type="primary"
            onClick={() => setIsModalAddOpen(true)}
            style={{
              backgroundColor: "#052C65",
              color: "#ffff",
            }}
            icon={<PlusCircleOutlined />}
          ></Button>
        </div>
        <TablePaginaton
          column={columns}
          data={data}
          setTotalProducts={setTotalProducts}
          total={totalProducts}
          pageNo={dataTimKiem.pageNo}
          pageSize={dataTimKiem.pageSize}
          handlePageChange={handlePageChange}
        ></TablePaginaton>
      </Container>

      <DetailMonHoc
        dataDetail={dataUpdate}
        dataBoMon={dataBoMon}
        dataHinhThuc={dataHinhThuc}
        isModalDetailOpen={isModalDetailOpen}
        setIsModalDetailOpen={setIsModalDetailOpen}
      ></DetailMonHoc>
      <UpdateMonHoc
        data={dataUpdate}
        setData={setDataUpdate}
        dataBoMon={dataBoMon}
        dataHinhThuc={dataHinhThuc}
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
      ></UpdateMonHoc>
      <AddMonHoc
        dataBoMon={dataBoMon}
        dataHinhThuc={dataHinhThuc}
        isModalAddOpen={isModalAddOpen}
        setIsModalAddOpen={setIsModalAddOpen}
      ></AddMonHoc>
    </>
  );
};
export default QuanLyMonHoc;
