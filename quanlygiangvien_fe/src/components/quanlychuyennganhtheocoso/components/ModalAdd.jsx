import { Modal, Form, Input, Button, Popconfirm, message } from "antd";

import { useQuanLyChuyenNganhTheoCoSo } from "../QuanLyChuyenNganhTheoCoSo";
import { reloadData, showModalAdd } from "../reducer/action";
import addService from "../services/AddService";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ModalAddChuyenNganhTheoCoSo = () => {
    const { state, dispatch } = useQuanLyChuyenNganhTheoCoSo();

    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        if (state.isShowAdd) {
            setIsLoading(false);
            form.resetFields();
        }
    }, [state.isShowAdd, form]);

    const handleSubmit = (data) => {
        setIsLoading(true);
        addService(data.name)
            .then(response => {
                if (response.httpStatus !== "OK") {
                    return toast.error(response.message);
                }

                message.info(response.message);
                dispatch(showModalAdd(false));
                dispatch(reloadData());
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message || "Không thể thêm mới chuyên ngành theo cơ sở");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <Modal
            open={state.isShowAdd}
            title="Thêm mới chuyên ngành theo cơ sở"
            onCancel={() => {
                dispatch(showModalAdd(false));
            }}
            footer={null}
        >
            <Form
                form={form}
                layout="horizontal"
                initialValues={{}}
                onFinish={values => handleSubmit(values)}
            >
                <Form.Item 
                    name="name"
                    rules={[
                        {required: true, message: "Tên chuyên ngành không được bỏ trống"}
                    ]}
                >
                    <Input
                        allowClear
                        placeholder="Tên chuyên ngành"
                    />
                </Form.Item>

                <div style={{ textAlign: 'right' }}>
                    <Popconfirm
                        title="Thông báo"
                        description="Bạn có muốn thêm không?"
                        onConfirm={event => form.submit()}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button type="primary" loading={isLoading}>Thêm mới bộ môn</Button>                       
                    </Popconfirm>
                    
                </div>
                
            </Form>
        </Modal>
    );
};

export default ModalAddChuyenNganhTheoCoSo;