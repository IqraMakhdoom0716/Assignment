import React from "react";

import { Table, Button, Modal } from 'antd';
import './AuthorTable.scss';

const AuthorTable = ({ authors, onDelete, onEdit }) => {
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button onClick={() => onEdit(record)}>Edit</Button>
          <Button danger onClick={() => onDelete(record)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <Table
      dataSource={authors}
      columns={columns}
      rowKey="id"
      className="author-table"
    />
  );
};

export default AuthorTable;
