import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateCourse } from '../../redux/slices/coursesSlice';
import DynamicForm from '../../components/Form/Form';
import '/src/pages/AddEditCourse/AddEditCourses.scss'

const AddEditCourse = () => {
  const { id } = useParams();
  const courses = useSelector((state) => state.courses);
  const course = courses.find((c) => c.id === parseInt(id));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = (values) => {
    dispatch(updateCourse({ ...course, ...values }));
    navigate('/manage-courses');
  };

  return (
    <div>
      <h1>Edit Course</h1>
      <DynamicForm
        type="course"
        initialValues={course}
        onSubmit={handleUpdate}
      />
    </div>
  );
};

export default AddEditCourse;
