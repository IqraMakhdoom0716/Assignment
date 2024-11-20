import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ManageAuthors from './pages/ManageAuthors/ManageAuthors';
import ManageCourses from './pages/ManageCourses/ManageCourses';

const App = () => (
  <Router>
    <Routes>
      <Route path="/manage-authors" element={<ManageAuthors />} />
      <Route path="/manage-courses" element={<ManageCourses />} />
    </Routes>
  </Router>
);

export default App;
