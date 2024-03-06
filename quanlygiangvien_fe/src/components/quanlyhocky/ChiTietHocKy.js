import React from 'react';
import { Button, Form, Select, DatePicker } from 'antd';
const App = () => {
  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: 'large',
      }}
      size={'large'}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item label="Tên học kỳ" >
        <Select>
            <Select.Option value="demo">FALL</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Năm học">
        <DatePicker />
      </Form.Item>
      <Form.Item label="Ngày bắt đầu">
        <DatePicker />
      </Form.Item>
      <Form.Item label="Button">
        <Button>Button</Button>
      </Form.Item>
    </Form>
  );
};
export default App;