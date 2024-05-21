import { Card, Typography, Button, Flex, Table, Tag, Space, Tooltip, Popconfirm, message, Pagination } from "antd";
import {
    UnorderedListOutlined,
    PlusCircleFilled,
    DeleteFilled,
    FormOutlined
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { useQuanLyChuyenNganhTheoCoSo } from "../QuanLyChuyenNganhTheoCoSo";
import {
    showModalAdd,
    showModalEdit,
    setPage,
    setPageSize,
    setLoading,
    reloadData,
    setTarget
} from "../reducer/action";

import getService from "../services/GetService";
import deleteService from "../services/DeleteService";
import { XOA_MEM } from "../../../apis/QuanLyChuyenNganhTheoCoSoAPI";
import { CHUA_XOA_CONSTANT } from "../../../app/constant/StatusEntityConstant";

const ListChuyenNganhTheoCoSo = () => {

    const { state, dispatch } = useQuanLyChuyenNganhTheoCoSo();

    const handleEdit = (id) => {
        dispatch(setTarget(null));
        dispatch(setLoading(true));
        getService(id)
            .then(response => {
                dispatch(setTarget(response));
                dispatch(showModalEdit(true));
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message || "Không thể GET thông tin chuyên ngành theo cơ sở");
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    };

    const handleDelete = (id) => {
        dispatch(setLoading(true));
        deleteService(id)
            .then(response => {
                if (response.httpStatus !== "OK") {
                    return toast.error(response.message);
                }

                message.info(response.message);
                dispatch(reloadData());
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message || "Không thể xoá chuyên ngành theo cơ sở này");
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            width: '5%',
            render: (stt) => <Typography.Text>{stt}</Typography.Text>
        },
        {
            title: 'Tên chuyên ngành',
            dataIndex: 'tenChuyenNganh',
            sorter: (a, b) => a.ten.length - b.ten.length,
            render: tenChuyenNganh => <Typography.Text>{tenChuyenNganh}</Typography.Text>
        },
        {
            title: 'Tên bộ môn',
            dataIndex: 'tenBoMon',
            sorter: (a, b) => a.ten.length - b.ten.length,
            render: tenBoMon => <Tag>{tenBoMon}</Tag>
        },
        {
            title: 'Tên cơ sở',
            dataIndex: 'tenCoSo',
            sorter: (a, b) => a.ten.length - b.ten.length,
            render: tenCoSo => <Tag color="purple">{tenCoSo}</Tag>
        },
        {
            title: 'Trưởng môn',
            dataIndex: 'tenTruongMon',
            sorter: (a, b) => a.ten.length - b.ten.length,
            render: tenTruongMon => <Typography.Text>{tenTruongMon}</Typography.Text>
        },
        {
            title: 'Trạng thái',
            dataIndex: 'trangThai',
            render: trangThai => {

                if (trangThai === XOA_MEM.chua_xoa) {
                    return <Tag color="green">Đang hoạt động</Tag>;
                }

                if (trangThai === XOA_MEM.da_xoa) {
                    return <Tag color="red">Ngưng hoạt động</Tag>;
                }

                return <Tag>Đã xoá</Tag>;
            }
        },
        {
            title: 'Hành động',
            width: '25%',
            render: (o) => (
                <Space size="middle">

                    <Tooltip title="Cập nhật" color="blue">
                        <Button
                            onClick={() => {
                                handleEdit(o.id);
                            }}
                            type="primary"
                            icon={<FormOutlined />}
                        ></Button>
                    </Tooltip>

                    <Tooltip title={o.trangThai === CHUA_XOA_CONSTANT ? "Ngưng hoạt động" : "Hoạt động lại"} color="red">
                        <Popconfirm
                            title="Thông báo"
                            description="Bạn có muốn xoá không?"
                            onConfirm={event => {
                                handleDelete(o.id);
                            }}
                            okText="Có"
                            cancelText="Không"
                        >
                            <Button
                                type="primary"
                                icon={<DeleteFilled />}
                                danger
                            ></Button>
                        </Popconfirm>
                    </Tooltip>

                </Space>
            ),
        },
    ];

    return (
        <Card
            style={{
                marginTop: '1.5rem',
                boxShadow: 'rgba(0, 0, 0, 0.1) 1px 0px 8px 0px'
            }}
        >
            <Flex justify="space-between" align="center">
                <Typography.Title level={4}><UnorderedListOutlined style={{ marginRight: '0.5rem' }} />Danh sách chuyên ngành theo cơ sở</Typography.Title>
                <Tooltip title="Thêm chuyên ngành theo cơ sở" color="blue">
                    <Button
                        type="primary"
                        icon={<PlusCircleFilled />}
                        size="middle"
                        color="#222"
                        onClick={e => {
                            dispatch(showModalAdd(true));
                        }} />
                </Tooltip>

            </Flex>

            <Table
                columns={columns}
                dataSource={state.data || []}
                pagination={false}
                rowKey={o => o.stt}
                style={{ marginTop: '30px' }}
                loading={state.isLoading}
                scroll={{ x: 400 }}
            />


            <Pagination
                disabled={state.isLoading}
                defaultCurrent={state.page}
                pageSize={state.pageSize}
                total={state.totalElements}
                showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} bộ môn`}
                style={{ marginTop: '1rem', textAlign: 'right' }}
                onChange={(page, pageSize) => {
                    dispatch(setPage(page));
                    dispatch(setPageSize(pageSize));
                }} />


        </Card>
    );
};

export default ListChuyenNganhTheoCoSo;