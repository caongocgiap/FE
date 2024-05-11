import { Button, Form, Input, Select, DatePicker, Row, Col } from "antd";
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
        style={{
          width: "100%"
        }}
        className={"d-flex align-items-center justify-content-between mt-3"}
      >
        <div
          style={{
            width: "100%"
          }}
        >
          <Row style={{
            justifyContent: "center",
            alignItems: "center"
          }}>
            <Col span={11}>
              <Form.Item name="ma" label="Mã">
                <Input name="ma" placeholder="Nhập mã môn học" />
              </Form.Item>
            </Col>
            <Col span={11} style={{
              marginLeft: "20px"
            }}>
              <Form.Item name="ten" label="Tên">
                <Input name="ten" placeholder="Nhập tên môn học" />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item name="boMon" label="Bộ môn">
                <Select placeholder="Chọn bộ môn">
                  {stateMonHoc.dataBoMon &&
                    stateMonHoc.dataBoMon.map((option) => (
                      <Option key={option.id} value={option.id}>
                        {option.ten}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={11} style={{
              marginLeft: "20px"
            }}>
              <Form.Item name="trangThai" label="Trạng thái">
                <Select placeholder="Chọn trạng thái">
                  {dataTrangThai &&
                    dataTrangThai.map((option) => (
                      <Option key={option} value={option}>
                        {option === "MO" ? "Mở" : option === "DANG_DANG_KY" ? "Đang đăng ký" : "Đóng"}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
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
          </Row>
        </div>
      </Form>
    </Container>
  );
};
export default SearchBarMonHoc;
