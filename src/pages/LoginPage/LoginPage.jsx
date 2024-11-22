import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { login } from '../../redux/slices/userSlice';
import './LoginPage.scss';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    const { email, password } = values;

    setTimeout(() => {
      if (email === 'courses@management.com' && password === 'password') {
        dispatch(login({ email, role: 'teacher' }));
        message.success('Login successful as Teacher!');
        navigate('/manage-courses');
      } else if (email === 'author@management.com' && password === 'password') {
        dispatch(login({ email, role: 'admin' }));
        message.success('Login successful as Admin!');
        navigate('/manage-authors');
      } else {
        message.error('Invalid credentials');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <Form 
        className="login-form"
        onFinish={handleLogin}
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input type="email" placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            block
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
