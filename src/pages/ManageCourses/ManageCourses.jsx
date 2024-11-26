import React, { useState, useEffect } from "react";
import { Modal, Button, Layout, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCourse, setCourses } from "../../redux/slices/coursesSlice";
import { logout } from "../../redux/slices/userSlice";
import CourseTable from "../../components/CourseTable/CourseTable";
import DynamicForm from "../../components/Form/Form";
import "./ManageCourses.scss";

const { Header, Sider, Content } = Layout;

const ManageCourses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courses = useSelector((state) => state.courses);
  const authors = useSelector((state) => state.authors);
  const user = useSelector((state) => state.user);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

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

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo">
          <h1 style={{ color: "white", textAlign: "center", padding: "10px 0" }}>
            {collapsed ? "CM" : "Course Manager"}
          </h1>
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" onClick={() => navigate("/manage-courses")}>
            Courses
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
          <h1>Course Management</h1>
          <Button
            type="primary"
            onClick={() => setIsModalVisible(true)}
            style={{ marginBottom: "20px" }}
          >
            Add Course
          </Button>
          <CourseTable courses={courses} />
          <Modal
            title="Add Course"
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
          >
            <DynamicForm type="course" authors={authors} onSubmit={handleAddCourse} />
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ManageCourses;
