import { Button, Form, Input, Select, Space, Modal, DatePicker } from "antd";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { saveCoSoCon, updateCoSoCon } from "../../../apis/QuanLyCoSoAPI";
import { useEffect } from "react";
import dayjs from "dayjs";
import moment from "moment";
import { addMonHoc, updateMonHoc } from "../../../apis/QuanLyMonHocAPI";
import { useQuanLyMonHoc } from "../context/MonHocContext";
import { setLoading, setReload, showModalAdd } from "../reducer/action";

const AddMonHoc = () => {
  const [form] = Form.useForm();
  const { stateMonHoc, dispatchMonHoc, dataHinhThuc } = useQuanLyMonHoc();

  const handleCloseUpdateOpen = () => {
    dispatchMonHoc(showModalAdd(false));
    form.resetFields();
  };

  const hanleAddMonHoc = () => {
    const formvalue = form.getFieldsValue();
    let thoiGianTao = formvalue.thoiGianTao.valueOf();
    const value = {
      ...formvalue,
      thoiGianTao: thoiGianTao,
    };
    dispatchMonHoc(setLoading(true)); // Bắt đầu loading trước khi gửi yêu cầu
    addMonHoc(value)
      .then((res) => {
        if (res.data.httpStatus === "CREATED") {
          dispatchMonHoc(setReload(true));
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 2000,
          });
          handleCloseUpdateOpen();
        }
      })
      .catch((e) => {
        for (let message in e.response.data) {
          toast.error(e.response.data[message]);
        }
      })
      .finally(() => {
        dispatchMonHoc(setLoading(false)); // Dừng loading sau khi kết thúc quá trình
      });
  };

  useEffect(() => {
    form.resetFields();
  }, [stateMonHoc.showModalAdd]);

  return (
    <>
      <Modal
        title="Thêm môn học"
        open={stateMonHoc.isShowAdd}
        onCancel={() => dispatchMonHoc(showModalAdd(false))}
        footer={null}
      >
        <Form
          form={form}
          name="control-hooks"
          style={{ maxWidth: 600 }}
          labelAlign="left"
          onFinish={hanleAddMonHoc}
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
              options={dataHinhThuc.map((item) => ({
                label: item,
                value: item,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="boMon"
            label="Bộ môn"
            rules={[{ required: true }]}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            <Select
              allowClear
              style={{ width: "100%" }}
              options={stateMonHoc.dataBoMon.map((item) => ({
                label: item.ten,
                value: item.id,
              }))}
            />
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
export default AddMonHoc;
