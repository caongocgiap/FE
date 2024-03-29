import { Button, Form, Input, Select, DatePicker } from "antd";
import moment from "moment";
import { Container } from "react-bootstrap";
import { useQuanLyMonHoc } from "../context/MonHocContext";
import { setKeyword } from "../reducer/action";
const { Option } = Select;

const SearchBarMonHoc = () => {
  const { stateMonHoc, dispatchMonHoc, dataTrangThai } = useQuanLyMonHoc();
  const [form] = Form.useForm();

  let ngayBatDau1 = "";

  const handleReset = () => {
    const x = form.resetFields();
    dispatchMonHoc(setKeyword({}));
  };

  const handleDateChange = (date, dateString) => {
    ngayBatDau1 = moment(dateString, "DD/MM/YYYY").valueOf();
  };

  const handleTimKiem = () => {
    const value = form.getFieldsValue();
    dispatchMonHoc(
      setKeyword({
        // ...dataTimKiem,
        ...value,
        ngayBatDau: ngayBatDau1,
      })
    );
  };

  return (
    <Container fluid className={"shadow-lg p-5 rounded-3 "}>
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
              {stateMonHoc.dataBoMon &&
                stateMonHoc.dataBoMon.map((option) => (
                  <Option key={option.id} value={option.id}>
                    {option.ten}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item name="trangThai" label="Trạng thái">
            <Select placeholder="Chọn trạng thái" style={{ width: "150px" }}>
              {dataTrangThai &&
                dataTrangThai.map((option) => (
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
    </Container>
  );
};
export default SearchBarMonHoc;
