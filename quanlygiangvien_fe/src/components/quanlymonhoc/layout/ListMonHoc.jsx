import {
  DeleteOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Button, Tag } from "antd";
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import { useQuanLyMonHoc } from "../context/MonHocContext";
import {
  setData,
  setDataBoMon,
  setLoading,
  setPage,
  setPageSize,
  setReload,
  setTarget,
  setTotalElement,
  showModalAdd,
  showModalDetail,
  showModalEdit,
} from "../reducer/action";
import { Pagination, Table } from "antd";
import {
  fetchAllBoMon,
  fetchAllMonHoc,
  getMonHoc,
  updateMonHocXoaMem,
} from "../../../apis/QuanLyMonHocAPI";
import { toast } from "react-toastify";

const ListMonHoc = () => {
  const { stateMonHoc, dispatchMonHoc } = useQuanLyMonHoc();

  const handleDetail = (id) => {
    dispatchMonHoc(setTarget({}));
    dispatchMonHoc(setLoading(true));
    getMonHoc(id).then((response) => {
      setLoading(true);
      dispatchMonHoc(setTarget(response.data));
      dispatchMonHoc(showModalDetail(true));
    });
    dispatchMonHoc(setLoading(false));
  };

  const handleUpdate = (id) => {
    dispatchMonHoc(setTarget({}));
    dispatchMonHoc(setLoading(true));
    getMonHoc(id).then((response) => {
      setLoading(true);
      dispatchMonHoc(setTarget(response.data));
      dispatchMonHoc(showModalEdit(true));
    });
    dispatchMonHoc(setLoading(false));
  };

  const handleDelele = (id) => {
    dispatchMonHoc(setLoading(true)); // Bắt đầu loading trước khi gửi yêu cầu cập nhật
    updateMonHocXoaMem(id)
      .then((res) => {
        setTimeout(() => {
          dispatchMonHoc(setReload(true));
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 2000,
          });
        });
      })
      .catch((e) => {
        for (let message in e.response.data) {
          toast.error(e.response.data[message]);
        }
      })
      .finally(() => {
        dispatchMonHoc(setLoading(false)); // Dừng loading sau khi kết thúc quá trình cập nhật
        dispatchMonHoc(setReload(false)); // Đặt lại trạng thái reloading sau khi hoàn tất cập nhật
      });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "id",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Mã môn học",
      dataIndex: "ma",
      key: "id",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Tên môn học",
      dataIndex: "ten",
      key: "id",
      align: "center",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Hình thức",
      dataIndex: "hinhThuc",
      key: "id",
      align: "center",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Bộ môn",
      dataIndex: "boMon",
      key: "id",
      align: "center",
      render: (text) => <span>{text}</span>,
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
          {text === "MO" ? "Mở" : text === "DANG_DANG_KY" ? "Đang đăng ký" : "Đóng"}
        </Tag>
      ),
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "formattedThoiGianTao",
      key: "id",
      align: "center",
      render: (text) => <span>{text}</span>,
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
            onClick={() => handleUpdate(row.id)}
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
            onClick={() => handleDetail(row.id)}
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
              handleDelele(row.id);
            }}
          ></Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    dispatchMonHoc(setLoading(true));
    fetchAllMonHoc(stateMonHoc.keyword, stateMonHoc.page, stateMonHoc.pageSize)
      .then((response) => {
        dispatchMonHoc(setData(response.data.content));
        dispatchMonHoc(setTotalElement(response.data.totalElements));
        dispatchMonHoc(setPageSize(response.data.size));
        dispatchMonHoc(setLoading(false)); // Di chuyển nó vào đây
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        dispatchMonHoc(setLoading(false)); // Đảm bảo xử lý trạng thái tải trong trường hợp có lỗi
      });
  }, [stateMonHoc.keyword, stateMonHoc.page, stateMonHoc.isReload]);

  useEffect(() => {
    fetchAllBoMon().then((response) => {
      dispatchMonHoc(setDataBoMon(response.data));
    });
  }, []);

  return (
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
          <h4 className="p-2">Quản lý môn học</h4>
        </div>
        <Button
          type="primary"
          onClick={() => dispatchMonHoc(showModalAdd(true), console.log("mo"))}
          style={{
            backgroundColor: "#052C65",
            color: "#ffff",
          }}
          icon={<PlusCircleOutlined />}
        ></Button>
      </div>
      <div className={"min-height-500"}>
        <Table
          columns={columns}
          dataSource={stateMonHoc.data}
          pagination={false}
          scroll={{ x: true }}
          loading={stateMonHoc.isLoading}
        />
      </div>
      <Pagination
        disabled={stateMonHoc.isLoading}
        pageSize={stateMonHoc.pageSize}
        total={stateMonHoc.totalElements}
        defaultCurrent={0}
        onChange={(page, pageSize) => {
          dispatchMonHoc(setPage(page));
          dispatchMonHoc(setPageSize(pageSize));
        }}
      />
    </Container>
  );
};

export default ListMonHoc;
