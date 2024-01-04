import React, { useState, useEffect } from "react";
import styles from "./Adminmanagecourses.module.css";
import { BASE_URL_API } from "./base1";

const ManageCourses = () => {
  const [formData, setFormData] = useState({
    Program_code: "",
    course_name: "",
    course_id: "",
    class_id: "",
    location: "",
    section: "",
    total_seats: "",
  });
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  

  const fetchCourses = () => {
    fetch(`${BASE_URL_API}/fetching_course.php`)
    //fetch(`${BASE_URL_API}/fetching_course`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setCourses(data.courses);
        } else {
          setError("Failed to fetch courses.");
        }
      });
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${BASE_URL_API}/add_course.php`, {
    //fetch(`${BASE_URL_API}/add_course`, {  
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.success) {
          alert("Course/Class added successfully."); // Alerting the success message
          fetchCourses();
          setFormData({
            Program_code: "",
            course_name: "",
            course_id: "",
            class_id: "",
            location: "",
            section: "",
            total_seats: "",
          });
        } else {
          setError(data.message);  // Display the error message
        }
      });
  };
  

  const handleDelete = (courseId) => {
    fetch(`${BASE_URL_API}/delete_course.php`, {
    //fetch(`${BASE_URL_API}/delete_course`, {  
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: courseId }),
    })
      .then(() => {
        alert("Course deleted successfully.");
        fetchCourses();
      })
      .catch(() => {
        alert("Failed to delete course.");
        setError("Failed to delete course.");
      });
  };

  const handleDeleteClass = (classId) => {
    fetch(`${BASE_URL_API}/delete_class.php`, {
    //fetch(`${BASE_URL_API}/delete_class`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: classId }),
    })
      .then(() => {
        alert("Class deleted successfully.");
        fetchCourses();
      })
      .catch(() => {
        alert("Failed to delete class.");
        setError("Failed to delete class.");
      });
  };

  return (
    <div className={styles.mainSection}>
      {error && <div className="error-message">{error}</div>}

      <h1 className="center">Add Course and Class:</h1>
      <form onSubmit={handleSubmit}>
        {/* Fields for courses */}
        <label for="Program_code">Program Code:</label>
        <input
          type="text"
          id="Program_code"
          name="Program_code"
          required
          onChange={handleInputChange}
        />
        <br />
        <label for="course_name">Course Name:</label>
        <input
          type="text"
          id="course_name"
          name="course_name"
          required
          onChange={handleInputChange}
        />
        <br />

        {/* Fields for classes */}
        <label for="course_id">Course ID for Class:</label>
        <input
          type="text"
          id="course_id"
          name="course_id"
          onChange={handleInputChange}
        />
        <br />
        <label for="location">Class Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          onChange={handleInputChange}
        />
        <br />
        <label for="section">Class Section:</label>
        <input
          type="text"
          id="section"
          name="section"
          onChange={handleInputChange}
        />
        <br />
        <label for="total_seats">Total Seats:</label>
        <input
          type="text"
          id="total_seats"
          name="total_seats"
          onChange={handleInputChange}
        />
        <br />

        <input type="submit" value="Add Course/Class" />
      </form>

      <div>
        <h1 className="center">Course List with Classes</h1>
        <table>
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Course Name</th>
              <th>Program Code</th>
              <th>Class ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => {
              // If there are no classes for a course, render a row with the course data and no class ID
              if (!course.classes || course.classes.length === 0) {
                return (
                  <tr key={course.course_id}>
                    <td>{course.course_id}</td>
                    <td>{course.course_name}</td>
                    <td>{course.Program_code}</td>
                    <td>-</td>
                    <td>
                      <button onClick={() => handleDelete(course.course_id)}>
                        Delete Course
                      </button>
                    </td>
                  </tr>
                );
              }

              // For courses with classes, render a row for each class
              return course.classes.map((classItem, index) => (
                <tr key={`${course.course_id}-${classItem.class_id}`}>
                  <td>{course.course_id}</td>
                  <td>{course.course_name}</td>
                  <td>{course.Program_code}</td>
                  <td>{classItem.class_id}</td>
                  <td>
                    <div className="vertical-buttons">
                      <button onClick={() => handleDelete(course.course_id)}>
                        Delete Course
                      </button>
                      <button
                        onClick={() => handleDeleteClass(classItem.class_id)}
                      >
                        Delete Class
                      </button>
                    </div>
                  </td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCourses;
