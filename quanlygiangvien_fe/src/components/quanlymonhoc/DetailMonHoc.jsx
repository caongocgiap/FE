import { Button, Form, Input, Select, Space, Modal, DatePicker } from "antd";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { saveCoSoCon, updateCoSoCon } from "../../apis/QuanLyCoSoAPI";
import { useEffect } from "react";
import dayjs from "dayjs";
import moment from "moment";
const { Option } = Select;

const DetailMonHoc = ({
  isModalDetailOpen,
  setIsModalDetailOpen,
  dataDetail,
  dataBoMon,
  dataHinhThuc,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    console.log(dataDetail);
    const dateObject = moment(
      dataDetail ? dataDetail.formattedThoiGianTao : "",
      "DD/MM/YYYY"
    );
    // console.log(dateObject);
    const value = { ...dataDetail, formattedThoiGianTao: dateObject };
    console.log(value);
    form.setFieldsValue(value); // Cập nhật giá trị của form khi dataUpdateCoSo thay đổi
  }, [dataDetail]);

  return (
    <>
      <Modal
        title="Môn học chi tiết"
        open={isModalDetailOpen}
        // onOk={handleOk}
        onCancel={() => setIsModalDetailOpen(false)}
        footer={null}
      >
        <Form form={form} name="control-hooks" style={{ maxWidth: 600 }}>
          <Form.Item name="ma" label="Mã môn học" rules={[{ required: true }]}>
            <Input
              style={{ width: "90%", marginLeft: "20px" }}
              //   value={dataDetail.ma}
              name="maMonHoc"
              disabled

              //   value={dataUpdateCoSoCon.tenCoSoCon}
            />
          </Form.Item>
          <Form.Item
            name="ten"
            label="Tên môn học"
            rules={[{ required: true }]}
          >
            <Input
              style={{ width: "90%", marginLeft: "20px" }}
              //   value={dataDetail.ten}
              name="maMonHoc"
              disabled

              //   value={dataUpdateCoSoCon.tenCoSoCon}
            />
          </Form.Item>
          <Form.Item name="hinhThuc" label="Hình thức">
            <Select
              placeholder="Chọn hình thức"
              //   onChange={(e) => onChangeSelect(e)}
              style={{ width: "83%", marginLeft: "50px" }}
              disabled
            >
              {dataHinhThuc &&
                dataHinhThuc.map((option) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item name="boMon" label="Bộ môn">
            <Select
              placeholder="Chọn bộ môn"
              //   onChange={(e) => onChangeSelect(e)}
              style={{ width: "82%", marginLeft: "60px" }}
              disabled
            >
              {dataBoMon &&
                dataBoMon.map((option) => (
                  <Option key={option.id} value={option.id}>
                    {option.ten}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item name="formattedThoiGianTao" label="Ngày bắt đầu">
            <DatePicker
              format={"DD/MM/YYYY"}
              style={{ width: "90%", marginLeft: "25px" }}
              disabled
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default DetailMonHoc;
