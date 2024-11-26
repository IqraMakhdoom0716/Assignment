import React, { useState } from "react";
import { Modal, Button, Form, Input, Table, Layout, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAuthor, setAuthors } from "../../redux/slices/authorsSlice";
import { logout } from "../../redux/slices/userSlice";
import "./ManageAuthors.scss";

const { Header, Sider, Content } = Layout;

const ManageAuthors = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authors = useSelector((state) => state.authors);
  const user = useSelector((state) => state.user);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [form] = Form.useForm();
  const [editingAuthor, setEditingAuthor] = useState(null);

  const handleFormSubmit = () => {
    form.validateFields().then((values) => {
      if (editingAuthor) {
        const updatedAuthors = authors.map((author) =>
          author.id === editingAuthor.id ? { ...author, ...values } : author
        );
        dispatch(setAuthors(updatedAuthors));
      } else {
        const newAuthor = { id: Date.now(), ...values };
        dispatch(addAuthor(newAuthor)); 
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleEditClick = (author) => {
    setEditingAuthor(author);
    form.setFieldsValue(author);
    setIsModalVisible(true);
  };

  const handleDelete = (record) => {
    const updatedAuthors = authors.filter((author) => author.id !== record.id);
    dispatch(setAuthors(updatedAuthors));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEditClick(record)}>
            Edit
          </Button>
          <Button danger onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo">
          <h1 style={{ color: "white", textAlign: "center", padding: "10px 0" }}>
            {collapsed ? "PM" : "Project Manager"}
          </h1>
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" onClick={() => navigate("/manage-authors")}>
            Author Management
          </Menu.Item>
          <Menu.Item key="2" onClick={() => navigate("/manage-courses")}>
            Course Management
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            padding: "0 20px",
            alignItems: "center",
          }}
        >
          <span>Welcome, {user?.email || "User"}!</span>
          <Button type="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Header>
        <Content style={{ margin: "20px", padding: "20px", background: "#fff" }}>
          <div className="manage-authors-header">
            <h1>Author Management</h1>
            <Button
              type="primary"
              onClick={() => {
                setEditingAuthor(null);
                form.resetFields();
                setIsModalVisible(true);
              }}
            >
              Add Author
            </Button>
          </div>
          <Table dataSource={authors} columns={columns} rowKey="id" />
          <Modal
            title={editingAuthor ? "Edit Author" : "Add Author"}
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={
              <Button type="primary" onClick={handleFormSubmit}>
                {editingAuthor ? "Save Changes" : "Add Author"}
              </Button>
            }
          >
            <Form form={form} layout="vertical">
              <Form.Item
                name="name"
                label="Author Name"
                rules={[{ required: true, message: "Please enter an author name!" }]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ManageAuthors;
