import { Form, Input, Select, Modal, DatePicker } from "antd";
import { useEffect } from "react";
import moment from "moment";
import { useQuanLyMonHoc } from "../context/MonHocContext";
import { showModalDetail } from "../reducer/action";
const { Option } = Select;

const DetailMonHoc = ({ }) => {
  const [form] = Form.useForm();
  const { stateMonHoc, dispatchMonHoc, dataHinhThuc } = useQuanLyMonHoc();

  useEffect(() => {
    let value = stateMonHoc.target;
    const dateObject = moment(
      value ? value.formattedThoiGianTao : "",
      "DD/MM/YYYY"
    );
    const valueForm = {
      ...value,
      formattedThoiGianTao: dateObject,
    };
    form.setFieldsValue(valueForm);
  }, [stateMonHoc.isShowDetail]);

  return (
    <>
      <Modal
        title="Môn học chi tiết"
        visible={stateMonHoc.isShowDetail}
        onCancel={() => dispatchMonHoc(showModalDetail(false))}
        footer={null}
      >
        <Form form={form} name="control-hooks" style={{ maxWidth: 600 }}>
          <Form.Item name="ma" label="Mã môn học" rules={[{ required: true }]}>
            <Input
              style={{ width: "90%", marginLeft: "20px" }}
              name="maMonHoc"
              disabled
            />
          </Form.Item>
          <Form.Item
            name="ten"
            label="Tên môn học"
            rules={[{ required: true }]}
          >
            <Input
              style={{ width: "90%", marginLeft: "20px" }}
              name="maMonHoc"
              disabled
            />
          </Form.Item>
          <Form.Item name="hinhThuc" label="Hình thức">
            <Select
              placeholder="Chọn hình thức"
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
              style={{ width: "82%", marginLeft: "60px" }}
              disabled
            >
              {stateMonHoc.dataBoMon &&
                stateMonHoc.dataBoMon.map((option) => (
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
