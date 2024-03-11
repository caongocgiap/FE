import { Button, Form, Input, Select, Space, Modal } from "antd";
import { saveCoSo } from "../../apis/QuanLyCoSoAPI";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

const ModalAddCoSo = ({ isModalAddCoSoOpen, setIsModalAddCoSoOpen }) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    addCoSo();
  };

  const handleCloseAddCoSoOpen = () => {
    setIsModalAddCoSoOpen(false);
    form.resetFields();
  };

  const addCoSo = async () => {
    const formValue = await form.getFieldsValue();
    console.log(formValue);
    try {
      const res = await saveCoSo(formValue);
      console.log(res.data);
      if (res.data.httpStatus === "CREATED") {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        handleCloseAddCoSoOpen();
      } else if (res.data.httpStatus === "NOT_ACCEPTABLE") {
        toast.warning(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  return (
    <>
      <Modal
        title="Thêm cơ sở"
        open={isModalAddCoSoOpen}
        // onOk={handleOk}
        onCancel={() => setIsModalAddCoSoOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          className={"d-flex align-items-center"}
        >
          <Form.Item
            name="tenCoSo"
            label="Tên cơ sở"
            rules={[{ required: true }]}
          >
            <Input style={{ width: "320px", marginRight: "10px" }} />
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.gender !== currentValues.gender
            }
          ></Form.Item>
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
export default ModalAddCoSo;
