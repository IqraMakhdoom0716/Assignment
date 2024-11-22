import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addAuthor, setAuthors } from "../../redux/slices/authorsSlice";
import Header from "../../components/Header/Header";
import "./ManageAuthors.scss";

const ManageAuthors = () => {
  const dispatch = useDispatch();
  const authors = useSelector((state) => state.authors);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingAuthor, setEditingAuthor] = useState(null);

  useEffect(() => {
    const storedAuthors = localStorage.getItem("authors");
    if (storedAuthors) {
      dispatch(setAuthors(JSON.parse(storedAuthors))); 
    }
  }, [dispatch]);

  useEffect(() => {
    if (authors.length > 0) {
      localStorage.setItem("authors", JSON.stringify(authors));
    }
  }, [authors]);

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
    <div className="manage-authors">
      <Header />
      <h1>Author Management</h1>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Add Author
      </Button>
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
    </div>
  );
};

export default ManageAuthors;
