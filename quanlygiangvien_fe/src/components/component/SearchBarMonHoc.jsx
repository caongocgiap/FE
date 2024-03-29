import { Button, Form, Input, Select, Space, Modal, DatePicker } from "antd";
import moment from "moment";
import { useEffect } from "react";
const { Option } = Select;

const SearchBarMonHoc = ({
  dataBoMon,
  dataTimKiem,
  setDataTimKiem,
  setTimKiem,
  timKiem,
}) => {
  const [form] = Form.useForm();
  const trangThai = ["MO", "DANG_DANG_KY", "DONG"];
  let ngayBatDau1 = "";

  const handleReset = () => {
    const x = form.resetFields();
    setDataTimKiem({
      ...dataTimKiem,
      search: [],
    });
    setTimKiem(!timKiem);
  };

  const handleDateChange = (date, dateString) => {
    ngayBatDau1 = moment(dateString, "DD/MM/YYYY").valueOf();
  };

  const handleTimKiem = () => {
    const value = form.getFieldsValue();
    setDataTimKiem({
      ...dataTimKiem,
      search: { ...value, ngayBatDau: ngayBatDau1 },
    });
    console.log(dataTimKiem);
    setTimKiem(!timKiem);
  };

  useEffect(() => {
    console.log(dataTimKiem);
  }, []);

  return (
    <>
      <Form
        form={form}
        name="control-hooks"
        onFinish={() => handleTimKiem}
        style={{ maxWidth: 600 }}
      >
        <div
          className={"d-flex align-items-center justify-content-between mt-3"}
          style={{ width: "1200px" }}
        >
          <Form.Item name="ma" label="Mã">
            <Input name="ma" style={{ width: "120px" }} />
          </Form.Item>
          <Form.Item name="ten" label="Tên">
            <Input name="ten" style={{ width: "120px" }} />
          </Form.Item>
          <Form.Item name="boMon" label="Bộ môn">
            <Select placeholder="Chọn bộ môn" style={{ width: "150px" }}>
              {dataBoMon &&
                dataBoMon.map((option) => (
                  <Option key={option.id} value={option.id}>
                    {option.ten}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item name="trangThai" label="Trạng thái">
            <Select placeholder="Chọn trạng thái" style={{ width: "150px" }}>
              {trangThai &&
                trangThai.map((option) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item name="ngayBatDau" label="Ngày bắt đầu">
            <DatePicker
              format={"DD/MM/YYYY"}
              style={{ width: "100%" }}
              onChange={handleDateChange}
            />
          </Form.Item>
        </div>
        <Form.Item>
          <Button
            htmlType="submit"
            style={{
              backgroundColor: "#052C65",
              color: "#ffff",
              marginRight: "10px",
            }}
            onClick={handleTimKiem}
          >
            Tìm kiếm
          </Button>
          <Button
            htmlType="submit"
            style={{
              backgroundColor: "#052C65",
              color: "#ffff",
            }}
            onClick={handleReset}
          >
            Làm mới
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default SearchBarMonHoc;
