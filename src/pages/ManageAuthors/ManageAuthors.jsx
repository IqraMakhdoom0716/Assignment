import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import Header from '../../components/Header/Header';
import AuthorTable from '../../components/AuthorTable/AuthorTable';
import DynamicForm from '../../components/Form/Form';
import './ManageAuthors.scss';

const ManageAuthors = () => {
  const [authors, setAuthors] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState(null);

  const handleAdd = () => {
    setEditingAuthor(null);
    setIsModalVisible(true);
  };

  const handleEdit = (author) => {
    setEditingAuthor(author);
    setIsModalVisible(true);
  };

  const handleDelete = (author) => {
    setAuthors((prev) => prev.filter((a) => a.id !== author.id));
  };

  const handleFormSubmit = (values) => {
    if (editingAuthor) {
      setAuthors((prev) =>
        prev.map((author) =>
          author.id === editingAuthor.id ? { ...author, ...values } : author
        )
      );
    } else {
      const newAuthor = { id: Date.now(), ...values };
      setAuthors((prev) => [...prev, newAuthor]);
    }
    setIsModalVisible(false);
  };

  return (
    <div className="manage-authors">
      <Header />
      <div className="manage-authors__header">
        <h1>Author Management</h1>
        <Button type="primary" onClick={handleAdd}>
          Add Author
        </Button>
      </div>
      <AuthorTable
        authors={authors}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <Modal
        title={editingAuthor ? 'Edit Author' : 'Add Author'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <AuthorForm
          initialValues={editingAuthor}
          onSubmit={handleFormSubmit}
        />
      </Modal>
    </div>
  );
};

export default ManageAuthors;
