import { Button, Form, Input, Select, Space, Modal, DatePicker } from "antd";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { saveCoSoCon, updateCoSoCon } from "../../apis/QuanLyCoSoAPI";
import { useEffect } from "react";
import dayjs from "dayjs";
import moment from "moment";
import { updateMonHoc } from "../../apis/QuanLyMonHocAPI";
const { Option } = Select;

const UpdateMonHoc = ({
  isModalUpdateOpen,
  setIsModalUpdateOpen,
  data,
  dataBoMon,
  dataHinhThuc,
}) => {
  const [form] = Form.useForm();

  const handleCloseUpdateOpen = () => {
    setIsModalUpdateOpen(false);
    form.resetFields();
  };

  const hanleUpdate = async () => {
    const formvalue = form.getFieldsValue();
    let thoiGianTao = formvalue.thoiGianTao.valueOf();
    const boMonUpdatae =
      data.boMon === formvalue.boMon ? data.idBoMon : formvalue.boMon;
    const value = {
      ...formvalue,
      boMon: boMonUpdatae,
      thoiGianTao: thoiGianTao,
    };
    console.log(boMonUpdatae);
    try {
      const res = await updateMonHoc({ ...value }, data.id);
      // console.log(res);
      if (res.data.httpStatus === "OK") {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 2000,
        });
        handleCloseUpdateOpen();
      }
    } catch (e) {
      for (let message in e.response.data) {
        toast.error(e.response.data[message]);
      }
    }
  };

  useEffect(() => {
    const dateObject = moment(
      data ? data.formattedThoiGianTao : "",
      "DD/MM/YYYY"
    );

    form.setFieldsValue({
      ten: data ? data.ten : "",
      ma: data ? data.ma : "",
      ten: data ? data.ten : "",
      hinhThuc: data ? data.hinhThuc : "",
      thoiGianTao: dateObject,
      boMon: data ? data.boMon : "",
    });
  });

  return (
    <>
      <Modal
        title="Môn học chi tiết"
        open={isModalUpdateOpen}
        // onOk={handleOk}
        onCancel={() => setIsModalUpdateOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          name="control-hooks"
          style={{ maxWidth: 600 }}
          labelAlign="left"
          onFinish={hanleUpdate}
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
              options={dataBoMon.map((item) => ({
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
export default UpdateMonHoc;
