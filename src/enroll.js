import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL_API } from "./base";
import { jsPDF } from "jspdf";

const Enroll = () => {
  const { userId } = useParams();
  const [pdfUrl, setPdfUrl] = useState("");
  const [courses, setCourses] = useState([]);
  const [year, setYear] = useState(2023); // Default year
  const [semester, setSemester] = useState("Fall"); // Default semester

  const availableYears = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]; // Modify as needed
  const availableSemesters = ["Spring", "Summer", "Fall"]; // Modify as needed

  useEffect(() => {
    fetch(
      `${BASE_URL_API}/getCourses.php?year=${year}&semester=${semester}&userId=${userId}`
    )
      .then((response) => response.json())
      .then((data) => {
        const updatedCourses = data.courses.map((course) => ({
          ...course,
          enrolled: false,
        }));
        setCourses(updatedCourses);
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, [year, semester, userId]);

  const handleEnroll = (courseId) => {
    fetch(`${BASE_URL_API}/enrollCourse.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        year: year,
        semester: semester,
        class_id: courseId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          alert(data.message);

          // Update the enrolled status of the course
          const updatedCourses = courses.map((course) =>
            course.class_id === courseId
              ? { ...course, enrolled: true }
              : course
          );
          setCourses(updatedCourses);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error during enrollment:", error);
      });
  };
  useEffect(() => {
    // Fetch courses
    fetch(`${BASE_URL_API}/fetchallcourses.php`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          generatePDF(data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  const generatePDF = (coursesData) => {
    const doc = new jsPDF();

    coursesData.forEach((course, index) => {
      doc.text(
        20,
        10 + index * 10,
        `${course.course_id}: ${course.course_name}`
      );
    });

    // Convert PDF to data URL
    const dataUrl = doc.output("datauristring");
    setPdfUrl(dataUrl); // Update state with the PDF data URL
  };

  return (
    <div className="enroll-page">
      <div className="main-section">
        <div className="selection-panel">
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {availableYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            {availableSemesters.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          {/* Conditionally render the link if pdfUrl is set */}
          <p>Here is a notice that here is the link to know what are the courses present in the program</p>
          <p>Note: don't panic if there are less no of classes are displayed below once we communicate with the Instructors and add classes</p>
          {pdfUrl && (
            <a
              href={pdfUrl}
              download="course-catalog.pdf"
              className="download-link"
            >
              Download Course Catalog
            </a>
          )}
        </div>

        <h2>{`${semester} ${year}`}</h2>

        <div className="grid-container">
          {courses.map((course) => (
            <div className="course-card" key={course.class_id}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEnroll(course.class_id);
                }}
              >
                <h3>
                  {course.course_id}
                  {course.course_name}
                </h3>
                <p>Instructor: {course.instructor_name}</p>
                <a
                  href={course.syllabus_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Syllabus
                </a>
                <p>Location: {course.location}</p>
                <p>Section: {course.section}</p>
                <p>Total Seats: {course.total_seats}</p>
                <p>Leftover Seats: {course.leftover_seats}</p>

                {course.enrolled ? (
                  <span className="enrolled-label">Enrolled</span>
                ) : (
                  <button type="submit" className="enroll-btn">
                    Enroll
                  </button>
                )}
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Enroll;
