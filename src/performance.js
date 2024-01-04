import React, { useState, useEffect, useCallback } from 'react';
import "./style.css";
import { BASE_URL_API } from "./base1";
const Performance = () => {
    const [students, setStudents] = useState([]);
    const [professors, setProfessors] = useState([]);
    const [searchId, setSearchId] = useState(''); // to store the input from the search bar

    const fetchStudents = useCallback(async (studentId = '') => {
        try {
            const response = await fetch(`${BASE_URL_API}/fetchStudentperformance.php?studentId=${studentId}`);
            //const response = await fetch(`${BASE_URL_API}/fetch-student-performance?studentId=${studentId}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setStudents(data);
        } catch (error) {
            console.error("Failed to fetch students", error);
        }
    }, []);

    const fetchProfessors = useCallback(async () => {
        try {
            const response = await fetch(`${BASE_URL_API}/fetchProfessorsdetails.php`);
            //const response = await fetch(`${BASE_URL_API}/fetch-professors-details`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setProfessors(data);
        } catch (error) {
            console.error("Failed to fetch professors", error);
        }
    }, []);

    useEffect(() => {
        fetchStudents();
        fetchProfessors();
    }, [fetchStudents, fetchProfessors]);

    const handleSearch = () => {
        if (searchId) {
            fetchStudents(searchId);
        }
    };

    return (
      <div className='specialcontainer'>
          <h2>Student Performance</h2>
          
          {/* Search functionality */}
          <div>
              <input
                  type="text"
                  placeholder="Enter Student ID"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
              />
              <button onClick={handleSearch}>Search</button>
          </div>

          {/* Display Student ID and Name */}
          {students.map(student => (
              <div key={student.studentId}>
                  <h3>Student ID: {student.studentId}</h3>
                  <h3>Student Name: {student.studentName}</h3>
                  
                  {student.courses.map(course => (
                      <div key={course.courseId}>
                          <h4>{course.courseName}</h4>
                          <table border="1">
                              <thead>
                                  <tr>
                                      <th>Exam Name</th>
                                      <th>Grade</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {course.exams.map(exam => (
                                      <tr key={exam.examId}>
                                          <td>{exam.examName}</td>
                                          <td>{exam.grade}</td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      </div>
                  ))}
              </div>
          ))}

          <h2>Professor Performance</h2>
          <table border="1">
              <thead>
                  <tr>
                      <th>Professor ID</th>
                      <th>Name</th>
                      <th>Class ID</th>
                      <th>Course Name</th>
                      <th>Section</th>
                  </tr>
              </thead>
              <tbody>
                  {professors.map(professor => (
                      <tr key={professor.professorId}>
                          <td>{professor.professorId}</td>
                          <td>{professor.name}</td>
                          <td>{professor.classId}</td>
                          <td>{professor.courseName}</td>
                          <td>{professor.section}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
  );
}

export default Performance;
