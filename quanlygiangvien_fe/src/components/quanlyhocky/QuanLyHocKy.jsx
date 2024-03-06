import ChiTietHocKy from './ChiTietHocKy'

import { Input, Space, Button, Table, Tag, Modal } from 'antd';
import { PlusCircleFilled, EditOutlined, EyeFilled } from '@ant-design/icons';
import axios from 'axios'
import { React, useState, useEffect } from 'react';

const onSearch = (value, _e, info) => console.log(info?.source, value);
const QuanLyHocKy = () => {
    const [data, setData] = useState([])
    const [rowData, setRowData] = useState(null);
    const [visible, setVisible] = useState(false);

    const pageIndex = 0;
    const { Search } = Input;

    useEffect(() => {
        fetchDataTable(pageIndex)
    }, [pageIndex])

    const fetchDataTable = (page) => {
        axios.get(`http://localhost:8080/hoc-ky/get-list/page=${page}`).then(response => {
            setData(response.data)
            console.log(response.data);
        }).catch(error => {
            console.log('Lỗi khi lấy dữ liệu từ API: ', error);
        })
    }

    const showModal = (data) => {
        setVisible(true);
        setRowData(data);
    }

    const closeModal = () => setVisible(false);
  
    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            render: (_, __, index) => index + 1
        },
        {
            title: 'Tên học kỳ',
            dataIndex: 'ten',
            key: 'ten',
        },
        {
            title: 'Năm học',
            dataIndex: 'nam',
            key: 'nam',
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'thoiGianBatDau',
            key: 'thoiGianBatDau',
        },
        {
            title: 'Trạng thái',
            key: 'xoaMem',
            dataIndex: 'xoaMem',
            render: (_, { xoaMem }) => {
                let color = xoaMem === 'CHUA_XOA' ? 'green' : 'volcano';
                let contentTag = xoaMem === 'CHUA_XOA' ? 'Chưa xóa' : 'Đã xóa'
                return (
                <>
                    <Tag color={color} key={xoaMem}>
                        {contentTag.toUpperCase()}
                    </Tag>
                </>
                );
            },
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                <button type='button' className='btn btn-success' onClick={() => showModal(record)}><EyeFilled /></button>
                <a href='/edit' className='btn btn-warning'><EditOutlined /></a>
                </Space>
            ),
        },
    ];

    return(
        <>
            <h1>Quản lý học kỳ - Block</h1>
            <Button type="primary" shape="round" icon={<PlusCircleFilled />} size={'large'} className='bg-success mt-3 mb-3'>
                Thêm
            </Button>
            <div className='d-flex justify-content-end'>
                <Space direction="vertical">
                    <Search placeholder="Tìm theo năm học" allowClear onSearch={onSearch} className='mb-4'/>
                </Space>
            </div>
            <Table columns={columns} dataSource={data.content} />

            <Modal
                title="Form chi tiết"
                visible={visible}
                onCancel={closeModal}
                footer={null}
            >
                <p>Thông tin chi tiết học kỳ</p>
                <ChiTietHocKy data={rowData} />
                
            </Modal>
        </>
    )
}
export default QuanLyHocKy