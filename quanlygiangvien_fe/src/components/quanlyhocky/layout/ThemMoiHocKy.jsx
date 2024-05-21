import { useBlock } from '../hooks/useBlock'
import { useHocKy } from '../hooks/useHocKy'

import React, { useState } from 'react';
import { Form, Select, DatePicker, Modal } from 'antd';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs'
import Swal from 'sweetalert2'

const ChiTietHocKy = ({ closeModal }) => {
  dayjs.extend(customParseFormat);
  const dataTenHocKy = ['SPRING', 'SUMMER', 'FALL']
  const [ten, setTen] = useState('')
  const [nam, setNam] = useState('')
  const [ngayBD, setNgayBD] = useState('')
  const [ngayKT, setNgayKT] = useState('')
  const [ngayKTBlock1, setNgayKTBlock1] = useState('')
  const { postHocKy } = useHocKy();
  const { postBlock } = useBlock();

  const handleTenChange = (value) => setTen(value)

  const handleNamChange = (value) => setNam(value ? parseInt(value.format('YYYY')) : '');

  const handleNgayBDChange = (value) => setNgayBD(value ? value.format('YYYY-MM-DD') : '');

  const handleNgayKTChange = (value) => setNgayKT(value ? value.format('YYYY-MM-DD') : '');

  const handleNgayKTBlock1Change = (value) => setNgayKTBlock1(value ? value.format('YYYY-MM-DD') : '');

  const handleSubmit = async () => {
    const isValidInputs = validateInputs();
    if (!isValidInputs) return;
    const isValidDateRange = validateDateRange();
    if (!isValidDateRange) return;

    try {
      const hocKyData = { ten: ten, nam: nam, thoiGianBatDau: ngayBD, xoaMem: 'CHUA_XOA' };
      const hocKy = await postHocKy(hocKyData);

      const block1Data = {
        idHocKy: hocKy.id,
        ten: 'BLOCK 1',
        thoiGianBatDau: ngayBD,
        thoiGianKetThuc: ngayKTBlock1
      };

      const block2Data = {
        idHocKy: hocKy.id,
        ten: 'BLOCK 2',
        thoiGianBatDau: ngayKTBlock1,
        thoiGianKetThuc: ngayKT
      };

      await postBlock(block1Data);
      await postBlock(block2Data);

      Swal.fire({
        title: "Thêm thành công!",
        icon: "success"
      });
      closeModal();
    } catch (error) {
      Swal.fire({
        title: "Thêm thất bại!",
        text: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
        icon: "error"
      });
    }
  };

  const validateInputs = () => {
    if (!ten || !nam || !ngayBD || !ngayKT || !ngayKTBlock1) {
      Swal.fire({
        title: "Thêm thất bại",
        text: "Vui lòng nhập đủ thông tin",
        icon: "info"
      });
      return false;
    }
    return true;
  };

  const validateDateRange = () => {
    const startDate = new Date(ngayBD);
    const endDate = new Date(ngayKT);
    const block1EndDate = new Date(ngayKTBlock1);

    if (endDate <= startDate) {
      Swal.fire({
        title: "Thêm thất bại",
        text: "Ngày kết thúc phải sau ngày bắt đầu",
        icon: "info"
      });
      return false;
    }

    if (block1EndDate > endDate || block1EndDate < startDate) {
      Swal.fire({
        title: "Thêm thất bại",
        text: "Ngày kết thúc block 1 phải sau ngày bắt đầu và trước ngày kết thúc",
        icon: "info"
      });
      return false;
    }

    return true;
  };

  return (
    <>
      <Form
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        initialValues={{ size: 'large' }}
        onFinish={handleSubmit}
      >
        <Form.Item label="Tên học kỳ" name="ten">
          <Select onChange={handleTenChange}>
            {dataTenHocKy.map((ten, index) => (
              <Select.Option key={index} value={ten}>{ten}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Năm học" name="nam">
          <DatePicker onChange={handleNamChange} format="YYYY" picker="year" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Ngày bắt đầu" name="ngayBD">
          <DatePicker onChange={handleNgayBDChange} format="DD/MM/YYYY" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Ngày KT block 1" name="ngayKTBlock1">
          <DatePicker onChange={handleNgayKTBlock1Change} format={'DD/MM/YYYY'} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Ngày kết thúc" name="ngayKT">
          <DatePicker onChange={handleNgayKTChange} format={'DD/MM/YYYY'} style={{ width: '100%' }} />
        </Form.Item>
        <button type='submit' className='btn btn-success'>Add</button>
      </Form>
    </>
  );
};

export default ChiTietHocKy;