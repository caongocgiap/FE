import { Card, Form, Flex, Input, Button, Popconfirm, Tooltip, message } from "antd";
import { FormOutlined } from "@ant-design/icons";
import { useQuanLyChuyenNganhTheoCoSo } from "../QuanLyChuyenNganhTheoCoSo";
import { useEffect, useState } from "react";
import { setLoading, showModalEdit, reloadData } from "../reducer/action";
import updateService from "../services/UpdateService";
import { toast } from "react-toastify";

const UpdateChuyenNganhTheoCoSo = () => {

    const { state, dispatch } = useQuanLyChuyenNganhTheoCoSo();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (state.isShowEdit) {
            setIsLoading(false);
            form.resetFields();
        }
    }, [state.isShowEdit, form]);



    const handleSubmit = (data) => {
        dispatch(setLoading(true));
        dispatch(showModalEdit(false));

        updateService(state.target.id, data.ten)
            .then(response => {
                if (response.httpStatus !== "OK") {
                    return toast.error(response.message);
                }

                message.info(response.message);
                dispatch(reloadData());
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message || "Không thể cập nhật chuyên ngành theo cơ sở");
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    };

    return (
        <Card
            style={{
                boxShadow: 'rgba(0, 0, 0, 0.1) 1px 0px 8px 0px'
            }}
        >

            <Form
                form={form}
                layout="horizontal"
                initialValues={state.target}
                onFinish={values => handleSubmit(values)}
            >
                <Flex justify="space-between" align="center">
                    <Form.Item 
                        name="ten"
                        style={{
                            marginBottom: 0,
                            marginRight: '1rem',
                            width: '100%'
                        }}
                        rules={[
                            {required: true, message: "Tên chuyên ngành không được bỏ trống"}
                        ]}
                    >
                        <Input
                            allowClear
                            placeholder="Tên chuyên ngành"
                        />
                    </Form.Item>

                    <Tooltip title="Cập nhật tên chuyên ngành theo cơ sở" color="blue">
                        <Popconfirm
                            title="Thông báo"
                            description="Bạn có muốn lưu lại không?"
                            onConfirm={event => form.submit()}
                            okText="Có"
                            cancelText="Không"
                        >
                            <Button type="primary" loading={isLoading} icon={<FormOutlined />}></Button>                       
                        </Popconfirm>
                    </Tooltip>
                </Flex>

            </Form>

        </Card>
    );
};

export default UpdateChuyenNganhTheoCoSo;