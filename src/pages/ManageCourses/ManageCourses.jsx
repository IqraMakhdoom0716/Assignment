import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addCourse, setCourses } from "../../redux/slices/coursesSlice";
import Header from "../../components/Header/Header";
import CourseTable from "../../components/CourseTable/CourseTable";
import DynamicForm from "../../components/Form/Form";
import "./ManageCourses.scss";

const ManageCourses = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  const authors = useSelector((state) => state.authors);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const storedCourses = localStorage.getItem("courses");
    if (storedCourses) {
      dispatch(setCourses(JSON.parse(storedCourses)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (courses.length > 0) {
      localStorage.setItem("courses", JSON.stringify(courses));
    }
  }, [courses]);

  const handleAddCourse = (values) => {
    const newCourse = { id: Date.now(), ...values };
    dispatch(addCourse(newCourse));
    setIsModalVisible(false);
  };

  return (
    <div className="manage-courses">
      <Header />
      <h1>Course Management</h1>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Add Course
      </Button>
      <CourseTable />
      <Modal
        title="Add Course"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <DynamicForm type="course" authors={authors} onSubmit={handleAddCourse} />
      </Modal>
    </div>
  );
};

export default ManageCourses;
