import { Form, Select, Button, Popconfirm, message } from "antd";
import { useQuanLyChuyenNganhTheoCoSo } from "../QuanLyChuyenNganhTheoCoSo";
import { useEffect, useState, useCallback } from "react";
import { setLoading, showModalEdit, reloadData } from "../reducer/action";
import updateService from "../services/UpdateService";
import { toast } from "react-toastify";

const UpdateChuyenNganhTheoCoSo = () => {

    const { state, dispatch } = useQuanLyChuyenNganhTheoCoSo();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [listChuyenNganh, setListChuyenNganh] = useState([]);
    const [listNhanVien, setListNhanVien] = useState([]);


    const initCallback = useCallback(() => {
        let boMonTheoCoSo = state.data_boMonTheoCoSo.find(o => o.id === state.target.idBoMonTheoCoSo);
        setListChuyenNganh(state.data_chuyenNganh.filter(o => o.idBoMon === boMonTheoCoSo.idBoMon));
        setListNhanVien(state.data_nhanVien.filter(o => o.idBoMon === boMonTheoCoSo.idBoMon));
    }, [state.target, state.data_boMonTheoCoSo, state.data_chuyenNganh, state.data_nhanVien]);

    useEffect(() => {
        if (state.isShowEdit) {
            initCallback();
            setIsLoading(false);
            form.resetFields();
        }
    }, [state.isShowEdit, form, initCallback]);



    const handleSubmit = (data) => {
        dispatch(setLoading(true));
        dispatch(showModalEdit(false));

        updateService(state.target.id, data.idBoMonTheoCoSo, data.idChuyenNganh, data.idTruongMon)
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

    const handleSelectBoMonTheoCoSo = value => {
        let boMonTheoCoSo = state.data_boMonTheoCoSo.find(o => o.id === value);
        setListChuyenNganh(state.data_chuyenNganh.filter(o => o.idBoMon === boMonTheoCoSo.idBoMon));
        setListNhanVien(state.data_nhanVien.filter(o => o.idBoMon === boMonTheoCoSo.idBoMon));
    };


    return (
            <Form
                form={form}
                layout="horizontal"
                initialValues={state.target}
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
                        title="Cập nhật chuyên ngành theo cơ sở"
                        description="Bạn có muốn lưu lại không?"
                        onConfirm={event => form.submit()}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button type="primary" loading={isLoading}>Lưu lại</Button>                       
                    </Popconfirm>
                    
                </div>

            </Form>
    );
};

export default UpdateChuyenNganhTheoCoSo;