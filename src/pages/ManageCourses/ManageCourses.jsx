import React, { useState } from 'react';
import { Modal } from 'antd';
import Header from '../../components/Header/Header';
import CourseTable from '../../components/CourseTable/CourseTable';
import DynamicForm from '../../components/Form/Form';
import './ManageCourses.scss';

const ManageCourses = () => {
  const [courses, setCourses] = useState([
    { id: 1, title: 'Math 101', author: 'John Doe', description: 'Basic Math Course' },
    { id: 2, title: 'Science 202', author: 'Jane Smith', description: 'Intermediate Science Course' },
  ]);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const handleDelete = (course) => {
    setCourseToDelete(course);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    setCourses((prevCourses) => prevCourses.filter((c) => c.id !== courseToDelete.id));
    setDeleteModalVisible(false);
  };

  return (
    <div className="manage-courses">
      <Header />
      <h1>Course Management</h1>
      <CourseTable courses={courses} onDelete={handleDelete} />
      
      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        visible={deleteModalVisible}
        onOk={confirmDelete}
        onCancel={() => setDeleteModalVisible(false)}
      >
        Are you sure you want to delete {courseToDelete?.title}?
      </Modal>
    </div>
  );
};

export default ManageCourses;
