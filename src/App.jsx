import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ManageAuthors from "./pages/ManageAuthors/ManageAuthors";
import ManageCourses from "./pages/ManageCourses/ManageCourses";
import LoginPage from "./pages/LoginPage/LoginPage";
import AddEditCourse from "./pages/AddEditCourse/AddEditCourse";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state?.user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        {user?.role === "admin" && (
          <>
            <Route path="/manage-authors" element={<ManageAuthors />} />
            <Route path="/manage-courses" element={<ManageCourses />} />
            <Route path="/manage-courses/:id" element={<AddEditCourse />} />
          </>
        )}

        {user?.role === "teacher" && (
          <>
            <Route path="/manage-courses" element={<ManageCourses />} />
            <Route path="/manage-courses/:id" element={<AddEditCourse />} />
          </>
        )}

        {!user && <Route path="*" element={<Navigate to="/" replace />} />}
      </Routes>
    </Router>
  );
}

export default App;
