import React, { useState} from "react";
import "./style.css";
import { useUser } from './UserContext';
import { BASE_URL_API } from "./base1";

const StudentProgress = () => {
    const [studentId, setStudentId] = useState("");
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { userId} = useUser();

    const handleSearch = () => {
        if (studentId) {
            setLoading(true);
            fetch(`${BASE_URL_API}/getStudentProgress.php?studentId=${studentId}&instructorId=${userId}`)
            //fetch(`${BASE_URL_API}/student-progress/${studentId}/${userId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response not OK");
                    }
                    return response.json();
                })
                .then(responseData => {
                    if (responseData.success) {
                        setStudentData(responseData.data);
                    } else {
                        setError(responseData.message);
                    }
                    setLoading(false);
                })
                .catch(error => {
                    setError("There was an error fetching the student's progress.");
                    setLoading(false);
                });
        }
    };

    return (
      <div className="student-progress-container">
        <h2>Student Progress Tracking</h2>
  
        {error && <p className="error-msg">{error}</p>}
  
        <div className="search-bar">
          <label>Student ID:</label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter student's ID"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
  
        {loading && <p>Loading student progress...</p>}
        {studentData && (
          <div className="student-progress-data">
            <p><strong>Student ID:</strong> {studentId}</p>
            
            {Object.keys(studentData).map((courseName) => (
              <div key={courseName}>
                <h3>{courseName}</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Assignment/Exam Name</th>
                      <th>Due Date</th>
                      <th>Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentData[courseName].map((assignment, idx) => (
                      <tr key={idx}>
                        <td>{assignment.exam_name}</td>
                        <td>{assignment.exam_date}</td>
                        <td>{assignment.grade ?? "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default StudentProgress;
