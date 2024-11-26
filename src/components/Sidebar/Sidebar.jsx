import React from "react";
import { Layout, Menu, Button } from "antd";
import { LogoutOutlined, DashboardOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import "./Sidebar.scss";

const { Sider } = Layout;

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Sider className="custom-sidebar" theme="light" width={250}>
      <div className="sidebar-header">
        <h2>{email}</h2>
        <Button
          type="primary"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          block
        >
          Logout
        </Button>
      </div>

      <Menu mode="inline" defaultSelectedKeys={["dashboard"]}>
        <Menu.Item
          key="dashboard"
          icon={<DashboardOutlined />}
          onClick={() => navigate("/manage-courses")}
        >
          Courses Dashboard
        </Menu.Item>
        <Menu.Item
          key="authors"
          icon={<DashboardOutlined />}
          onClick={() => navigate("/manage-authors")}
        >
          Authors Dashboard
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
