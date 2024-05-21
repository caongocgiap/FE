import React, { useEffect, useState } from "react";
import { DatePicker, Form, Select } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import axios from "axios";
import Swal from "sweetalert2";
import { getBlockByIdHocKyApi } from "../../../apis/QuanLyBlockAPI";

const SuaHocKy = ({ data, closeModal }) => {
  dayjs.extend(customParseFormat);
  const dataTenHocKy = ["SPRING", "SUMMER", "FALL"];
  const [ten, setTen] = useState(data.ten);
  const [nam, setNam] = useState(data.nam);
  const [ngayBD, setNgayBD] = useState(data.thoiGianBatDau);
  const [ngayKT, setNgayKT] = useState("");
  const [ngayKTBlock1, setNgayKTBlock1] = useState("");
  const [dataBlock, setDataBlock] = useState([]);
  const idHocKy = data.id;

  useEffect(() => {
    setTen(data.ten);
    setNam(data.nam);
    setNgayBD(data.thoiGianBatDau);
    fetchDataTableBlock(idHocKy);
  }, [data, idHocKy]);

  const fetchDataTableBlock = (idHocKy) => {
    getBlockByIdHocKyApi(idHocKy)
      .then((response) => {
        if (response.status === 200) {
          const blocks = response.data;
          // Kiểm tra xem mảng blocks có ít nhất hai phần tử không
          if (blocks.length >= 2) {
            // Tìm block có tên là "BLOCK 1"
            const block1 = blocks.find(block => block.ten === "BLOCK 1");
            // Tìm block có tên là "BLOCK 2"
            const block2 = blocks.find(block => block.ten === "BLOCK 2");

            // Kiểm tra xem block1 và block2 có tồn tại không trước khi thiết lập state
            if (block1 && block2) {
              setDataBlock(blocks);
              setNgayKT(block2.thoiGianKetThuc);
              setNgayKTBlock1(block1.thoiGianKetThuc);
            } else {
              console.log("Không tìm thấy các block phù hợp trong mảng blocks");
            }
          } else {
            console.log("Mảng blocks không có đủ phần tử để xử lý");
          }
        }
      })
      .catch((error) => {
        console.log("Lỗi khi lấy dữ liệu từ API: ", error);
      });

  };

  const handleSubmit = async () => {
    const linkApiHocKy = `http://localhost:8080/hoc-ky/update/${data.id}`;
    const linkApiBlock1 = `http://localhost:8080/block/update/${dataBlock[0].id}`;
    const linkApiBlock2 = `http://localhost:8080/block/update/${dataBlock[1].id}`;

    if (!ten || !nam || !ngayBD || !ngayKT || !ngayKTBlock1) {
      Swal.fire({
        title: "Cập nhật thất bại!",
        text: "Vui lòng nhập đầy đủ thông tin trên form",
        icon: "error",
      });
      return;
    }

    const hocKyData = {
      ten: ten,
      nam: nam,
      thoiGianBatDau: ngayBD,
      xoaMem: "CHUA_XOA",
    };

    Swal.fire({
      title: "Cảnh báo",
      text: "Bạn có chắc muốn cập nhật không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cập nhật",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.put(linkApiHocKy, hocKyData);
          const hocKy = response.data.id;

          const block1Data = {
            idHocKy: idHocKy,
            ten: "BLOCK 1",
            thoiGianBatDau: ngayBD,
            thoiGianKetThuc: ngayKTBlock1,
          };

          const block2Data = {
            idHocKy: idHocKy,
            ten: "BLOCK 2",
            thoiGianBatDau: ngayKTBlock1,
            thoiGianKetThuc: ngayKT,
          };

          await axios.put(linkApiBlock1, block1Data);
          await axios.put(linkApiBlock2, block2Data);
          Swal.fire({
            title: "Cập nhật thành công!",
            icon: "success",
          });
          closeModal();
        } catch (error) {
          console.error("Lỗi khi gửi yêu cầu:", error);
          Swal.fire({
            title: "Cập nhật thất bại!",
            text: "Có lỗi xảy ra khi gửi yêu cầu",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <>
      <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 17,
        }}
        layout="horizontal"
        initialValues={{
          size: "large",
        }}
        onFinish={handleSubmit}
      >
        <Form.Item label="Tên học kỳ">
          <Select value={ten} onChange={(value) => setTen(value)}>
            {dataTenHocKy.map((ten, index) => (
              <Select.Option key={index} value={ten}>
                {ten}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Năm học">
          <DatePicker
            value={dayjs(`${nam}`, "YYYY")}
            onChange={(value) =>
              setNam(value ? parseInt(value.format("YYYY")) : "")
            }
            format={"YYYY"}
            picker="year"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item label="Ngày bắt đầu">
          <DatePicker
            value={dayjs(ngayBD, "YYYY/MM/DD")}
            onChange={(value) =>
              setNgayBD(value ? value.format("YYYY-MM-DD") : "")
            }
            format={"DD/MM/YYYY"}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item label="Ngày KT block 1">
          <DatePicker
            value={dayjs(ngayKTBlock1, "YYYY/MM/DD")}
            onChange={(value) =>
              setNgayKTBlock1(value ? value.format("YYYY-MM-DD") : "")
            }
            format={"DD/MM/YYYY"}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item label="Ngày kết thúc">
          <DatePicker
            value={dayjs(ngayKT, "YYYY/MM/DD")}
            onChange={(value) =>
              setNgayKT(value ? value.format("YYYY-MM-DD") : "")
            }
            format={"DD/MM/YYYY"}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <div className="text-end">
          <button type="submit" className="btn btn-warning mb-3">
            Cập nhật
          </button>
        </div>
      </Form>
    </>
  );
};
export default SuaHocKy;
