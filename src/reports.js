import React, { useState, useEffect } from "react";
import { useUser } from './UserContext';
import { BASE_URL_API } from "./base1";

const Report = () => {
  const { userId } = useUser();
  const [courses, setCourses] = useState([]);
  const [isDbError, setIsDbError] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL_API}/getStudentReport.php?userId=${userId}`)
    //fetch(`${BASE_URL_API}/student-report/${userId}`)
      .then(response => {
        if (!response.ok) throw new Error("Network response not OK");
        return response.json();
      })
      .then(data => {
        setCourses(data);
      })
      .catch(error => {
        console.error('There was an error fetching the data', error);
        setIsDbError(true);
      });
  }, [userId]);

  return (
    <div className="report main-section">
      <section className="main-section">
        {isDbError && <p style={{ color: 'red' }}>Error fetching from database.</p>}
        <h2>Results & Reports</h2>

        {courses.map(course => (
          <div key={course.courseId} className="course-card">
            <h3>Course ID: {course.courseId}</h3>
            <p>Course Name: {course.courseName}</p>
            <p>classid: {course.classid}</p>

            <ul>
              {course.exams.map(exam => (
                <li key={exam.examId}>
                  <p>Exam Name: {exam.examName}</p>
                  <p>Score: {exam.grade} / {exam.maxMarks}</p>
                  <p>Mean Score: {exam.meanGrade}</p>
                  <p>Status: {exam.grade < exam.meanGrade ? "Below Mean" : exam.grade > exam.meanGrade ? "Above Mean" : "At Mean"}</p>
                </li>
              ))}
            </ul>
            
            <div>
              <p>Total Course Grade(till graded): {course.totalScore}</p>
              <p>Total Course Grade: {course.exams.reduce((acc, exam) => acc + parseFloat(exam.grade), 0)} / {course.exams.reduce((acc, exam) => acc + exam.maxMarks, 0)}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Report;
