import React from 'react';
import { Table, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCourse } from '../../redux/slices/coursesSlice';
import { useNavigate } from 'react-router-dom';
import './CourseTable.scss';

const CourseTable = () => {
  const courses = useSelector((state) => state.courses); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

   const handleEdit = (id) => {
     navigate(`/manage-courses/${id}`); 
   };

  const handleDelete = (id) => {
    dispatch(deleteCourse(id)); 
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
          <Button 
            onClick={() => handleEdit(record.id)}
          > Edit
          </Button>
          <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </>
      ),
    },
  ];

  return <Table dataSource={courses} columns={columns} rowKey="id" />;
};

export default CourseTable;
