import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useLoginMutation } from "../../redux/slices/userApiSlice";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import "./LoginPage.scss";

const LoginPage = () => {
  const [loginUser, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    const { email, password } = values;

    try {
      const user = await loginUser({ email, password }).unwrap(); 
      dispatch(login(user));
      message.success(`Login successful as ${user.role}!`);
      navigate(user.role === "admin" ? "/manage-authors" : "/manage-courses");
    } catch (error) {
      message.error(error.message || "Invalid credentials");
    }
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
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input type="email" placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading} block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
