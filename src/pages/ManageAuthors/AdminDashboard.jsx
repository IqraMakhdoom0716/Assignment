import React, { useState } from "react";
import ManageAuthors from "./ManageAuthors";
import DynamicForm from "./DynamicForm";

const AdminDashboard = () => {
  const [authors, setAuthors] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ]);

  const addAuthor = (newAuthor) => {
    setAuthors((prev) => [...prev, newAuthor]);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ManageAuthors authors={authors} setAuthors={setAuthors} />
      <DynamicForm
        type="course"
        authors={authors}
        onSubmit={(data) => console.log("Course Submitted:", data)}
      />
    </div>
  );
};

export default AdminDashboard;
