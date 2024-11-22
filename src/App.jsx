import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ManageAuthors from './pages/ManageAuthors/ManageAuthors';
import ManageCourses from './pages/ManageCourses/ManageCourses';
import LoginPage from './pages/LoginPage/LoginPage';
import { useSelector, useDispatch } from 'react-redux';
import AddEditCourse from './pages/AddEditCourse/AddEditCourse';

function App() {
  const {user} = useSelector((state) => state?.user);
  console.log("user is this: ", user?.role);
  return(
  <>
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginPage />}
        />
        {
          user?.role === 'teacher' && (
            <>
            <Route
              path="/manage-courses"
              element={<ManageCourses />}
            />
            <Route path="/manage-courses/:id" element={<AddEditCourse/>} />
            </>
          )
        }
        {
          user?.role === 'admin' && (
            <Route
              path="/manage-authors"
              element={<ManageAuthors />}
            />
          )
        }
       
      </Routes>
    </Router>
  </>
  );
}

export default App;
