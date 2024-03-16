import { Card, Typography, Select } from "antd";
import { FileSearchOutlined } from "@ant-design/icons";
import { useQuanLyChuyenNganhTheoCoSo } from "../QuanLyChuyenNganhTheoCoSo";
import { setIdCoSo } from "../reducer/action";

const FilterChuyenNganhTheoCoSo = () => {

    const { state, dispatch } = useQuanLyChuyenNganhTheoCoSo();

    return (
        <Card
            style={{
                boxShadow: 'rgba(0, 0, 0, 0.1) 1px 0px 8px 0px'
            }}
        >
            <Typography.Title level={4}><FileSearchOutlined style={{marginRight: '0.5rem'}}/>Tìm kiếm</Typography.Title>

            <Select
                mode="tags"
                size="middle"
                placeholder="Tìm kiếm chuyên ngành cơ sở theo tên"
                value={state.idCoSo}
                style={{ width: '100%' }}
                onChange={(ids) => {
                    dispatch(setIdCoSo(ids));
                }}
                options={[]}
                disabled={state.isLoading}
            />

        </Card>
    );
};

export default FilterChuyenNganhTheoCoSo;