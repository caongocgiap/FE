import { Card, Typography, Select, Form, Input, Flex, Button } from "antd";
import { FileSearchOutlined } from "@ant-design/icons";
import { useQuanLyChuyenNganhTheoCoSo } from "../QuanLyChuyenNganhTheoCoSo";
import { setFilter } from "../reducer/action";
import { XOA_MEM } from "../../../apis/QuanLyChuyenNganhTheoCoSoAPI";

const FilterChuyenNganhTheoCoSo = () => {

    const { state, dispatch } = useQuanLyChuyenNganhTheoCoSo();
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        dispatch(setFilter(values));
    };

    const handleReset = () => {
        dispatch(setFilter({
            tenChuyenNganh: null,
            tenBoMon: "0",
            idCoSo: "0",
            tinhTrang: "0"
        }));

        form.resetFields();
    };

    return (
        <Card
            style={{
                boxShadow: 'rgba(0, 0, 0, 0.1) 1px 0px 8px 0px'
            }}
        >
            <Typography.Title level={4}><FileSearchOutlined style={{marginRight: '0.5rem'}}/>Tìm kiếm</Typography.Title>

            <Form
                form={form}
                layout="horizontal"
                initialValues={state.filter}
                onFinish={values => handleSubmit(values)}
            >
                <Flex justify="center" align="center" wrap="wrap" gap="small">
                    <Form.Item 
                        name="tenChuyenNganh"
                    >
                        <Input
                            allowClear
                            placeholder="Tên chuyên ngành"
                        />
                    </Form.Item>

                    <Form.Item 
                        name="idBoMon"
                        rules={[
                            {required: true, message: "Vui lòng chọn một bộ môn"}
                        ]}
                    >
                        <Select
                            size="middle"
                            placeholder="Bộ môn"
                        >
                            <Select.Option value="0">Tất cả bộ môn</Select.Option>
                        {state.data_boMon && state.data_boMon.map((option) => (
                            <Select.Option key={option.id} value={option.id}>{option.ten}</Select.Option>
                        ))}
                        </Select>
                    </Form.Item>

                    <Form.Item 
                        name="idCoSo"
                        rules={[
                            {required: true, message: "Vui lòng chọn một cơ sở"}
                        ]}
                    >
                        <Select
                            size="middle"
                            placeholder="Cơ sở"
                        >
                            <Select.Option value="0">Tất cả cơ sở</Select.Option>
                        {state.data_coSo && state.data_coSo.map((option) => (
                            <Select.Option key={option.id} value={option.id}>{option.ten}</Select.Option>
                        ))}
                        </Select>
                    </Form.Item>

                    <Form.Item 
                        name="tinhTrang"
                        rules={[
                            {required: true, message: "Vui lòng chọn một trạng thái"}
                        ]}
                    >
                        <Select
                            size="middle"
                            placeholder="Tình trạng"
                        >
                            <Select.Option value="0">Tất cả tình trạng</Select.Option>
                            <Select.Option value={XOA_MEM.chua_xoa}>Đang hoạt động</Select.Option>
                            <Select.Option value={XOA_MEM.da_xoa}>Dừng hoạt động</Select.Option>
                        </Select>
                    </Form.Item>


                </Flex>

                <Flex justify="center" align="center" wrap="wrap" gap="small">
                    <Button 
                        type="primary" 
                        loading={state.isLoading}
                        onClick={() => form.submit()}>Tìm kiếm</Button>   
                    <Button 
                        type="primary" 
                        disabled={state.isLoading}
                        onClick={() => handleReset()}>Clear</Button>   
                </Flex>
            </Form>

        </Card>
    );
};

export default FilterChuyenNganhTheoCoSo;