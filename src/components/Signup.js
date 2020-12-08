import React from 'react';
import axios from 'axios';

import { Form, Input, Button, notification } from 'antd';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Signup = (props) => {

  const onFinish = values => {
    console.log('Success:', values);
    axios.post('/api/auth/signup', {
      username: values.username,
      password: values.password,
      email: values.email,
      name: values.name
    })
    .then(response => {
      console.log(response);
      notification.success({
        message: 'Successfully created account!'
      });
      props.history.push('login');
    })
    .catch(error => {
      console.log(error);
    })
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Signup;