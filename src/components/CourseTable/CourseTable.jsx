import React from 'react';
import { Table, Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import './CourseTable.scss';

const CourseTable = ({ courses, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/manage-courses/${id}`);
  };

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Author', dataIndex: 'author', key: 'author' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button onClick={() => handleEdit(record.id)}>Edit</Button>
          <Button danger onClick={() => onDelete(record)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <Table
      dataSource={courses}
      columns={columns}
      rowKey="id"
      className="course-table"
    />
  );
};

export default CourseTable;
