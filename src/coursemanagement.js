import React, { useState, useEffect } from "react";
import { BASE_URL_API } from "./base1";
import { useUser } from "./UserContext";
import { useParams } from "react-router-dom";

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const { userId: contextUserId } = useUser();
  const { instructorId } = useParams();
  const [classesTaught, setClassesTaught] = useState([]);

  const userId = instructorId || contextUserId;

  useEffect(() => {
    fetch(`${BASE_URL_API}/fetchAvailableCourses.php?instructorId=${userId}`)
    //fetch(`${BASE_URL_API}/courses`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setCourses(data.data);
        } else {
          console.error(
            "Unexpected data format from fetchAvailableCourses:",
            data
          );
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the courses data", error);
      });
  }, [userId]);

  useEffect(() => {
    fetch(`${BASE_URL_API}/fetchInstructorClasses.php?instructorId=${userId}`)
    //fetch(`${BASE_URL_API}/instructor-classes?instructorId=${userId}`)

      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setClassesTaught(data.data);
        } else {
          console.error("Error fetching classes taught by instructor:", data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the classes data", error);
      });
  }, [userId]);

  const handleCheckboxChange = (courseId) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses((prevCourses) =>
        prevCourses.filter((id) => id !== courseId)
      );
    } else {
      setSelectedCourses((prevCourses) => [...prevCourses, courseId]);
    }
  };

  const handleClassDelete = (classId) => {
    fetch(`${BASE_URL_API}/deleteInstructorClass.php`, {
    //fetch(`${BASE_URL_API}/delete-instructor-class`, {  
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        classId: classId,
        instructorId: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          alert("Class successfully deleted.");
          // Remove the deleted class from the local state to update the UI
          setClassesTaught((prevClasses) =>
            prevClasses.filter((cls) => cls.class_id !== classId)
          );
        } else {
          console.error("Error deleting class:", data);
        }
      })
      .catch((error) => {
        console.error("There was an error deleting the class", error);
      });
  };
  const handleCourseSubmission = () => {
    if (!year) {
      alert("Please select a year.");
      return;
    }

    if (!semester) {
      alert("Please select a semester.");
      return;
    }

    if (selectedCourses.length === 0) {
      alert("Please select at least one course.");
      return;
    }
    const data = {
      selectedCourses: selectedCourses,
      instructorId: userId,
      year: year,
      semester: semester,
    };

    fetch(`${BASE_URL_API}/teachCourses.php`, {
    //fetch(`${BASE_URL_API}/enroll`, {  
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === "success") {
          alert("Courses successfully saved.");
        } else {
          console.error("Error saving courses:", data);
          alert(data.message || "Error occurred while saving courses.");
        }
      })
      .catch((error) => {
        console.error("There was an error saving the courses", error);
        alert("An error occurred while saving the courses.");
      });
  };

  return (
    <div className="course-management">
      <div className="main-section">
        <div className="container">
          <h1>Course Management</h1>

          <div className="create-course">
            <h2>Create New Course</h2>
            <label>Select Year: </label>
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="" disabled>
                Select Year
              </option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>

            <label>Select Semester: </label>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
              <option value="" disabled>
                Select Semester
              </option>
              <option value="Spring">Spring</option>
              <option value="Fall">Fall</option>
              <option value="Summer">Summer</option>
            </select>
            <div>
              {courses.map((course) => (
                <div key={course.course_id}>
                  <input
                    type="checkbox"
                    value={course.course_id}
                    checked={selectedCourses.includes(course.course_id)}
                    onChange={() => handleCheckboxChange(course.course_id)}
                  />
                  <label>
                    {course.course_id}-{course.course_name}
                  </label>
                </div>
              ))}
              <button onClick={handleCourseSubmission}>Take Courses</button>
            </div>
          </div>
          <div className="course-list">
            <h2>Classes Being Taught</h2>
            <ul>
              {classesTaught.map((cls) => (
                <li key={cls.class_id}>
                  <span>Course ID: {cls.course_id}  Course Name: {cls.course_name}  Class ID: {cls.class_id}  Section: {cls.section} </span>
                  <button onClick={() => handleClassDelete(cls.class_id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseManagement;
