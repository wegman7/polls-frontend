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

const Login = (props) => {
  
  const onFinish = values => {
    console.log('Success:', values);
    axios.post('/api/auth/signin', {
      usernameOrEmail: values.usernameOrEmail,
      password: values.password
    })
    .then(response => {
      console.log(response);
      notification.success({
        description: 'Successfully logged in.'
      });
      localStorage.setItem('token', response.data.accessToken);
      props.loadUser();
      props.history.push('/');
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
        label="Username or email"
        name="usernameOrEmail"
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

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;