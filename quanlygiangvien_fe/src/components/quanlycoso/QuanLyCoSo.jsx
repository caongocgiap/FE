import React, { useEffect, useState } from "react";
import { Tag, Button } from "antd";
import TablePaginaton from "../component/TablePagination";
import { fetchAllCoSos, updateXoaMemCoSo } from "../../apis/QuanLyCoSoAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import {
  DeleteOutlined,
  PicCenterOutlined,
  PlusCircleOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import SearchBar from "../component/SearchBarInput";
import ModalAddCoSo from "./ModalAddCoSo";
import ModalUpdateCoSo from "./ModalUpdateCoSo";
import { toast } from "react-toastify";
import QuanLyBoMonTheoCoSo from "./quanlybomontheocoso/QuanLyBoMonTheoCoSo";
import FileUpload from "../component/FileUpload";

const QuanLyCoSo = () => {
  const [dataTimKiemCoSo, setDataTimKiemCoSo] = useState({
    pageNo: 1,
    pageSize: 5,
    listTenCoSo: [""],
  }); // data tìm kiếm cơ cở
  const [dataCoSo, setDataCoSo] = useState([]); // Dữ liệu sản phẩm hiện tại
  const [totalProducts, setTotalProducts] = useState(0); // Tổng số sản phẩm
  const [isModalAddCoSoOpen, setIsModalAddCoSoOpen] = useState(false);
  const [isModalUpdateCoSoOpen, setIsModalUpdateCoSoOpen] = useState(false);
  const [isModalBoMonOpen, setIsModalBoMonOpen] = useState(false);
  const [dataUpdateCoSo, setDataUpdateCoSo] = useState(); // Dữ liệu sản phẩm hiện tại

  const columns = [
    {
      title: "STT",
      dataIndex: "idCoSo",
      key: "idCoSo",
      width: "5%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên cơ sở",
      dataIndex: "tenCoSo",
      key: "idCoSo",
      width: "20%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Trạng thái",
      dataIndex: "xoaMemCoSo",
      key: "idCoSo",
      align: "center",
      render: (text) => (
        <Tag color={text === "CHUA_XOA" ? "green" : "red"}>
          {text === "CHUA_XOA" ? "Hoạt động" : "Ngừng hoạt động"}
        </Tag>
      ),
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
              handleUpdateCoSo(row);
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
              handleUpdateXoaMemCoSo(row);
            }}
          ></Button>
        </>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const data = await fetchAllCoSos(dataTimKiemCoSo);
      console.log(data.data.content);
      setDataCoSo(data.data.content);
      setTotalProducts(data.data.totalElement);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handlePageChange = (page, pageSize) => {
    setDataTimKiemCoSo({
      ...dataTimKiemCoSo,
      pageNo: page,
      pageSize: pageSize,
    });
  };

  const handleAddCoSo = () => {
    setIsModalAddCoSoOpen(true);
  };

  const handleUpdateCoSo = (row) => {
    console.log(row);
    setIsModalUpdateCoSoOpen(true);
    setDataUpdateCoSo(row);
    console.log(dataUpdateCoSo);
    console.log(isModalUpdateCoSoOpen);
  };

  const handleUpdateXoaMemCoSo = async (row) => {
    setDataUpdateCoSo(row);
    try {
      const res = await updateXoaMemCoSo(row);
      console.log(res.data);
      if (res.data.httpStatus === "OK") {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (res.data.httpStatus === "NOT_ACCEPTABLE") {
        toast.warning(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    // Hàm gọi fetchAllProducts khi pageNo hoặc pageSize thay đổi
    console.log(dataTimKiemCoSo);
    fetchData();
  }, [
    dataTimKiemCoSo,
    isModalAddCoSoOpen,
    isModalUpdateCoSoOpen,
    dataUpdateCoSo,
  ]);

  return (
    <>
      <div className={"d-flex justify-content-between align-items-center"}>
        <h2
          className={
            "text-primary-emphasis p-4 gap-3 d-flex align-items-center"
          }
        >
          Quản lý cơ sở
        </h2>
        <Button
          icon={<PicCenterOutlined />}
          style={{
            backgroundColor: "#052C65",
            color: "#ffff",
          }}
          onClick={() => setIsModalBoMonOpen(true)}
        ></Button>
      </div>
      <Container fluid className={"shadow-lg p-5 rounded-3 "}>
        <SearchBar
          setDataTimKiem={setDataTimKiemCoSo}
          dataTimKiem={dataTimKiemCoSo}
          nameField={"listTenCoSo"}
        ></SearchBar>
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
            <h4 className="p-2">Quản lý cơ sở</h4>
          </div>
          <div className="d-flex">
            <Button
              type="primary"
              onClick={handleAddCoSo}
              style={{
                backgroundColor: "#052C65",
                color: "#ffff",
              }}
              icon={<PlusCircleOutlined />}
            ></Button>
            <FileUpload></FileUpload>
          </div>
        </div>
        <TablePaginaton
          column={columns}
          data={dataCoSo}
          setTotalProducts={setTotalProducts}
          total={totalProducts}
          pageNo={dataTimKiemCoSo.pageNo}
          pageSize={dataTimKiemCoSo.pageSize}
          handlePageChange={handlePageChange}
        ></TablePaginaton>
      </Container>

      <QuanLyBoMonTheoCoSo
        isModalBoMonOpen={isModalBoMonOpen}
        setIsModalBoMonOpen={setIsModalBoMonOpen}
        dataCoSo={dataCoSo}
      ></QuanLyBoMonTheoCoSo>
      <ModalAddCoSo
        isModalAddCoSoOpen={isModalAddCoSoOpen}
        setIsModalAddCoSoOpen={setIsModalAddCoSoOpen}
      ></ModalAddCoSo>
      <ModalUpdateCoSo
        dataUpdateCoSo={dataUpdateCoSo}
        setDataUpdateCoSo={setDataUpdateCoSo}
        setIsModalUpdateCoSoOpen={setIsModalUpdateCoSoOpen}
        isModalUpdateCoSoOpen={isModalUpdateCoSoOpen}
      />
    </>
  );
};
export default QuanLyCoSo;
