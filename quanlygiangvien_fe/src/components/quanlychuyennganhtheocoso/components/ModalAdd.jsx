import { Modal, Form, Select, Button, Popconfirm, message } from "antd";

import { useQuanLyChuyenNganhTheoCoSo } from "../QuanLyChuyenNganhTheoCoSo";
import { reloadData, showModalAdd } from "../reducer/action";
import addService from "../services/AddService";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ModalAddChuyenNganhTheoCoSo = () => {
    const { state, dispatch } = useQuanLyChuyenNganhTheoCoSo();

    const [listNhanVien, setListNhanVien] = useState([]);
    const [listChuyenNganh, setListChuyenNganh] = useState([]);
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
        addService(data.idBoMonTheoCoSo, data.idChuyenNganh, data.idTruongMon)
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

    const handleSelectBoMonTheoCoSo = (value) => {
        let boMonTheoCoSo = state.data_boMonTheoCoSo.find(o => o.id === value);
        setListChuyenNganh(state.data_chuyenNganh.filter(o => o.idBoMon === boMonTheoCoSo.idBoMon));
        setListNhanVien(state.data_nhanVien.filter(o => o.idBoMon === boMonTheoCoSo.idBoMon));
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
                    name="idBoMonTheoCoSo"
                    rules={[
                        {required: true, message: "Vui lòng chọn một bộ môn theo cơ sở"}
                    ]}
                >
                    <Select
                        size="middle"
                        placeholder="Bộ môn theo cơ sở"
                        onChange={(value) => handleSelectBoMonTheoCoSo(value)}
                    >
                    {state.data_boMonTheoCoSo && state.data_boMonTheoCoSo.map((option) => (
                        <Select.Option key={option.id} value={option.id}>{option.tenBoMon} - cơ sở {option.tenCoSo}</Select.Option>
                    ))}
                    </Select>
                </Form.Item>

                <Form.Item 
                    name="idChuyenNganh"
                    rules={[
                        {required: true, message: "Vui lòng chọn một chuyên ngành"}
                    ]}
                >
                    <Select
                        size="middle"
                        placeholder="Chuyên ngành"
                    >
                    {listChuyenNganh.map((option) => (
                        <Select.Option key={option.id} value={option.id}>{option.ten}</Select.Option>
                    ))}
                    </Select>
                </Form.Item>

                <Form.Item 
                    name="idTruongMon"
                >
                    <Select
                        allowClear
                        size="middle"
                        placeholder="Trưởng môn"
                    >
                    {listNhanVien.map((option) => (
                        <Select.Option key={option.id} value={option.id}>{option.ten} - {option.maNhanVien}</Select.Option>
                    ))}
                    </Select>
                </Form.Item>

                <div style={{ textAlign: 'right' }}>
                    <Popconfirm
                        title="Thông báo"
                        description="Bạn có muốn thêm không?"
                        onConfirm={event => form.submit()}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button type="primary" loading={isLoading}>Thêm mới chuyên ngành theo cơ sở</Button>                       
                    </Popconfirm>
                    
                </div>
                
            </Form>
        </Modal>
    );
};

export default ModalAddChuyenNganhTheoCoSo;