import { Button, Form, Input, Select, Space, Modal, DatePicker } from "antd";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import moment from "moment";
import { updateMonHoc } from "../../../apis/QuanLyMonHocAPI";
import { setData, setLoading, setReload, showModalEdit } from "../reducer/action";
import { useQuanLyMonHoc } from "../context/MonHocContext";
const { Option } = Select;

const UpdateMonHoc = () => {
  const [form] = Form.useForm();
  const { stateMonHoc, dispatchMonHoc, dataHinhThuc } = useQuanLyMonHoc();

  const handleCloseUpdateOpen = () => {
    dispatchMonHoc(showModalEdit(false));
    form.resetFields();
  };
  const handleUpdate = () => {
    let formvalue = form.getFieldsValue();
    let thoiGianTao = formvalue.thoiGianTao.valueOf();
    let boMonUpdatae =
      stateMonHoc.target.boMon === formvalue.boMon
        ? stateMonHoc.target.idBoMon
        : formvalue.boMon;
    const value = {
      ...formvalue,
      boMon: boMonUpdatae,
      thoiGianTao: thoiGianTao,
    };
    dispatchMonHoc(setLoading(true)); // Bắt đầu loading trước khi gửi yêu cầu cập nhật
    updateMonHoc({ ...value }, stateMonHoc.target.id)
      .then((res) => {
        dispatchMonHoc(setReload(!stateMonHoc.isReload));
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 2000,
        });
        // fetchAllMonHoc().then(res =)
        dispatchMonHoc(setData([]));
        handleCloseUpdateOpen();
      })
      .catch((e) => {
        for (let message in e.response.data) {
          toast.error(e.response.data[message]);
        }
      })
      .finally(() => {
        dispatchMonHoc(setLoading(false)); // Dừng loading sau khi kết thúc quá trình cập nhật
      });
  };

  useEffect(() => {
    let value = stateMonHoc.target;
    const dateObject = moment(
      value ? value.formattedThoiGianTao : "",
      "DD/MM/YYYY"
    );
    form.setFieldsValue({
      ten: value ? value.ten : "",
      ma: value ? value.ma : "",
      hinhThuc: value ? value.hinhThuc : "",
      thoiGianTao: dateObject,
      boMon: value ? value.boMon : "",
    });
  }, [stateMonHoc.isShowEdit]);

  return (
    <>
      <Modal
        title="Môn học chi tiết"
        visible={stateMonHoc.isShowEdit}
        onCancel={() => dispatchMonHoc(showModalEdit(false))}
        footer={null}
      >
        <Form
          form={form}
          name="control-hooks"
          style={{ maxWidth: 600 }}
          labelAlign="left"
          onFinish={handleUpdate}
        >
          <Form.Item
            name="ma"
            label="Mã môn học"
            rules={[{ required: true }]}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            <Input style={{ width: "100%" }} name="maMonHoc" />
          </Form.Item>
          <Form.Item
            name="ten"
            label="Tên môn học"
            rules={[{ required: true }]}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            <Input style={{ width: "100%" }} name="maMonHoc" />
          </Form.Item>

          <Form.Item
            name="hinhThuc"
            label="Hình thức"
            rules={[{ required: true }]}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            <Select
              allowClear
              style={{ width: "100%" }}
              placeholder="Chọn kỳ OnBroad"
            >
              {dataHinhThuc &&
                dataHinhThuc.map((option) => (
                  <Select.Option key={option} value={option}>
                    {option}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="boMon"
            label="Bộ môn"
            rules={[{ required: true }]}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            <Select allowClear style={{ width: "100%" }}>
              {stateMonHoc.dataBoMon &&
                stateMonHoc.dataBoMon.map((option) => (
                  <Select.Option key={option.id} value={option.id}>
                    {option.ten}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="thoiGianTao"
            label="Ngày bắt đầu"
            rules={[{ required: true }]}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            <DatePicker format={"DD/MM/YYYY"} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              icon={<FontAwesomeIcon icon={faBuildingCircleArrowRight} />}
              style={{
                backgroundColor: "#052C65",
                color: "#ffff",
              }}
            ></Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default UpdateMonHoc;
